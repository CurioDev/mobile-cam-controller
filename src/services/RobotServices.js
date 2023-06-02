import DeviceController from "@espruino-tools/core";
import { transpile } from "@espruino-tools/transpiler";

let device = new DeviceController();

export const connect = (sendMessage) => {
	if (sendMessage) {
		const connectData = {
			type: 0,
			data: { isConnected: false },
		};
		sendMessage(connectData);
	} else {
		let promise = new Promise((resolve, reject) => {
			resolve(device.connect());
		})
			.then(() => {
				console.log("Device connected");
			})
			.catch((err) => {
				console.err(err);
			});
	}
};

export const disconnect = (sendMessage) => {
	if (sendMessage) {
		const connectData = {
			type: 0,
			data: { isConnected: true },
		};
		sendMessage(connectData);
	} else {
		device.disconnect();
		console.log("Device disconnected");
	}
};

export const moveCar = (labelId, sendMessage) => {
	// 0: Forward, 1: Back, 2: Left, 3: Right
	switch (labelId) {
		case 0:
			goForward(sendMessage);
			break;
		case 1:
			goBack(sendMessage);
			break;
		case 2:
			goLeft(sendMessage);
			break;
		case 3:
			goRigth(sendMessage);
			break;

		default:
			break;
	}

	if (sendMessage) {
		const moveCommand = {
			type: 1,
			data: { message: "move" },
		};
		sendMessage(moveCommand);
	}
};

const goForward = (sendMessage) => {
	if (sendMessage) {
		const moveData = {
			type: 2,
			data: { x: 1000, y: 1000, speed: 600 },
		};
		sendMessage(moveData);
	} else {
		device.UART.write("go(1000, 1000, 600)\n", () => {});
	}
};

const goBack = (sendMessage) => {
	if (sendMessage) {
		const moveData = {
			type: 2,
			data: { x: -1000, y: -1000, speed: 600 },
		};
		sendMessage(moveData);
	} else {
		device.UART.write("go(-1000, -1000, 600)\n", () => {});
	}
};

const goLeft = (sendMessage) => {
	if (sendMessage) {
		const moveData = {
			type: 2,
			data: { x: 0, y: 1000, speed: 600 },
		};
		sendMessage(moveData);
	} else {
		device.UART.write("go(1000, 0, 600)\n", () => {});
	}
};

const goRigth = (sendMessage) => {
	if (sendMessage) {
		const moveData = {
			type: 2,
			data: { x: 1000, y: 0, speed: 600 },
		};
		sendMessage(moveData);
	} else {
		device.UART.write("go(0, 1000, 600)\n", () => {});
	}
};
