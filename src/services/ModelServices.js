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

export const train = (
	userLearningRate,
	userBatchSize,
	userEpochs,
	userHiddenUnits,
	setLoss,
	setShowDataAlert,
	setBatchSizeAlert
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
				kernelInitializer: "varianceScaling",
				useBias: false,
				activation: "softmax",
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

	model.fit(datasetController.xs, datasetController.ys, {
		batchSize,
		epochs: userEpochs,
		callbacks: {
			onBatchEnd: async (batch, logs) => {
				console.log("Loss: " + logs.loss.toFixed(5));
				// Sends loss instantly.
				// ui.trainStatus('Loss: ' + logs.loss.toFixed(5));
				setLoss("Loss: " + logs.loss.toFixed(5));
			},
		},
	});

	console.log(model);
};

export const addSampleHandler = (ctx, label) => {
	let img = tf.browser.fromPixels(ctx);

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

export const init = async () => {
	setWasmPaths("/tfjs-backend-wasm.wasm");
	tf.setBackend("wasm").then(async () => {
		console.log(tf.getBackend());
		truncatedMobileNet = await loadTruncatedMobileNet();
	});
};
