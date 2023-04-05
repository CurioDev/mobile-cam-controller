import * as tf from "@tensorflow/tfjs";
import { setWasmPaths } from "@tensorflow/tfjs-backend-wasm";
import { DatasetController } from "./DatasetController";

let truncatedMobileNet;
let model;

const datasetController = new DatasetController();

async function loadTruncatedMobileNet() {
	const mobileNet = await tf.loadLayersModel(
		"https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json"
	);

	const layer = mobileNet.getLayer("conv_pw_13_relu");
	return tf.model({ inputs: mobileNet.inputs, outputs: layer.output });
}

export const addSampleHandler = (camImg, label) => {
	let img = tf.browser.fromPixels(camImg);

	let processedImg = tf.tidy(() =>
		img.expandDims(0).toFloat().div(127).sub(1)
	);

	datasetController.addExample(
		truncatedMobileNet.predict(processedImg),
		label
	);

	img.dispose();
	processedImg.dispose();
};

export const train = async (
	userLearningRate,
	userBatchSize,
	userEpochs,
	userHiddenUnits,
	setLoss,
	setShowDataAlert,
	setBatchSizeAlert,
	setLossHistory
) => {
	if (datasetController.xs == null) {
		console.error("Add some examples to train.");
		setShowDataAlert(true);
		return;
	}

	model = tf.sequential({
		layers: [
			tf.layers.flatten({
				inputShape: truncatedMobileNet.outputs[0].shape.slice(1),
			}),
			tf.layers.dense({
				units: userHiddenUnits,
				activation: "relu",
				kernelInitializer: "varianceScaling",
				useBias: true,
			}),
			tf.layers.dense({
				units: 4,
				kernelInitializer: "varianceScaling",
				useBias: false,
				activation: "softmax",
			}),
		],
	});

	const optimizer = tf.train.adam(userLearningRate);
	model.compile({ optimizer: optimizer, loss: "categoricalCrossentropy" });

	const batchSize = Math.floor(datasetController.xs.shape[0] * userBatchSize);
	if (batchSize <= 0) {
		console.error("Batch size is 0 or NaN.");
		setBatchSizeAlert(true);
		return;
	}

	await model
		.fit(datasetController.xs, datasetController.ys, {
			batchSize,
			epochs: userEpochs,
			callbacks: {
				onBatchEnd: async (batch, logs) => {
					setLoss("LOSS: " + logs.loss.toFixed(5));
				},
				onTrainEnd: async (logs) => {
					setLoss("TRAIN AGAIN?");
				},
			},
		})
		.then((results) => {
			console.log(results.history.loss);
			setLossHistory(results.history.loss);
		});
};

export const predict = async (camImg) => {
	let img = tf.browser.fromPixels(camImg);

	let processedImg = tf.tidy(() =>
		img.expandDims(0).toFloat().div(127).sub(1)
	);

	const embeddings = truncatedMobileNet.predict(processedImg);

	const predictions = model.predict(embeddings);

	const predictedClass = predictions.as1D().argMax();
	const classId = (await predictedClass.data())[0];

	img.dispose();
	processedImg.dispose();

	return classId;
};

export const init = async () => {
	setWasmPaths("/tfjs-backend-wasm.wasm");
	tf.setBackend("wasm").then(async () => {
		console.log(tf.getBackend());
		truncatedMobileNet = await loadTruncatedMobileNet();
	});
};
