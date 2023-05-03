import * as tf from "@tensorflow/tfjs";

export class DatasetController {
	addExample(example, label) {
		// One-hot encode the label.
		const y = tf.tidy(() => tf.oneHot(tf.tensor1d([label]).toInt(), 4));

		if (this.xs == null) {
			// For the first example that gets added, keep example and y so that the
			// ControllerDataset owns the memory of the inputs. This makes sure that
			// if addExample() is called in a tf.tidy(), these Tensors will not get
			// disposed.
			this.xs = tf.keep(example);
			this.ys = tf.keep(y);
			console.log(this.xs);
			console.log(this.ys);
		} else {
			const oldX = this.xs;
			this.xs = tf.keep(oldX.concat(example, 0));

			const oldY = this.ys;
			this.ys = tf.keep(oldY.concat(y, 0));
			console.log(this.xs);
			console.log(this.ys);

			oldX.dispose();
			oldY.dispose();
			y.dispose();
		}
	}

	deleteExample(imageIndex) {
		// TO DO => The slice and concat works strange
		const oldX = this.xs;
		const xsLeft = oldX.slice(0, imageIndex + 1);
		const xsRight = oldX.slice(imageIndex + 2);

		this.xs = tf.keep(xsLeft.concat(xsRight));

		const oldY = this.ys;
		const ysLeft = oldY.slice(0, imageIndex + 1);
		const ysRight = oldY.slice(imageIndex + 2);

		this.ys = tf.keep(ysLeft.concat(ysRight));

		console.log(this.xs);
		console.log(this.ys);
	}
}
