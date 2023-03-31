import DeviceController from "@espruino-tools/core";
import { transpile } from "@espruino-tools/transpiler";

let device = new DeviceController();

export const connect = () => {
	let promise = new Promise((resolve, reject) => {
		resolve(device.connect());
	})
		.then(() => {
			console.log("Device connected");
		})
		.catch((err) => {
			console.err(err);
		});
};

export const disconnect = () => {
	device.disconnect();
	console.log("Device disconnected");
};

export const moveCar = (labelId) => {
	// 0: Forward, 1: Back, 2: Left, 3: Right
	if (labelId === 0) {
		goForward();
	} else if (labelId === 1) {
		goBack();
	} else if (labelId === 2) {
		goLeft();
	} else if (labelId === 3) {
		goRigth();
	}
};

const goForward = () => {
	device.UART.write("go(100, 100)\n", () => {});
};

const goBack = () => {
	device.UART.write("go(-100, -100)\n", () => {});
};

const goLeft = () => {
	device.UART.write("go(100, 0)\n", () => {});
};

const goRigth = () => {
	device.UART.write("go(0, 100)\n", () => {});
};
