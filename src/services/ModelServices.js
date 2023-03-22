import * as tf from '@tensorflow/tfjs';
import { DatasetController } from './DatasetController';

export let truncatedMobileNet;

const datasetController = new DatasetController();

async function loadTruncatedMobileNet() {
    const mobileNet = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

    const layer = mobileNet.getLayer('conv_pw_13_relu');
    return tf.model({inputs: mobileNet.inputs, outputs: layer.output});
}

/**
 * Creates a batched image (1-element batch) of shape [1, w, h, c].
 */
export const addSampleHandler = (ctx, label) => {
    let img = tf.browser.fromPixels(ctx);

    let processedImg = tf.tidy(() => img.expandDims(0).toFloat().div(127).sub(1));

    datasetController.addExample(truncatedMobileNet.predict(processedImg), label);

    img.dispose();
    processedImg.dispose();
}

export const init = async () => {
    truncatedMobileNet = await loadTruncatedMobileNet();
}