import React, { useRef, useState } from "react";

import { Tab, Tabs, Alert } from "react-bootstrap";

import Training from "./Training";
import Driving from "./Driving";

export default function Dashboard() {
	const forwardPhotoRef = useRef(null);
	const leftPhotoRef = useRef(null);
	const rightPhotoRef = useRef(null);
	const backPhotoRef = useRef(null);

	const [showInstructionsAlert, setShowInstructionsAlert] = useState(true);

	if (showInstructionsAlert) {
		return (
			<Alert
				variant="primary"
				onClose={() => setShowInstructionsAlert(false)}
				dismissible
			>
				<Alert.Heading>Welcome to Cam Controller!</Alert.Heading>
				<hr />
				<p>
					- This app allows you to drive the robot using your camera.
				</p>
				<p>
					- Adjust your camera to the images you will use for forward,
					backward, turn right and turn left commands and add samples
					using the ADD SAMPLE buttons.
				</p>
				<p>
					- Adjust the parameters in the corners as you wish. If you
					don't know what these parameters are, you can leave them as
					default.
				</p>
				<p>- Train the model with the TRAIN button.</p>
				<p>
					- Switch to the "Driving" tab and press the "START" button.
				</p>
				<p>- Start directing the robot as you wish with your camera!</p>

				<p>
					- If the robot does not move as you want, retrain the model
					by adding more examples in the "Training" tab..
				</p>
			</Alert>
		);
	} else {
		return (
			<Tabs
				defaultActiveKey="training"
				id="justify-tab-example"
				className="mb-3"
				// transition="false"
				justify
			>
				<Tab eventKey="training" title="Training">
					<Training
						forwardPhotoRef={forwardPhotoRef}
						leftPhotoRef={leftPhotoRef}
						rightPhotoRef={rightPhotoRef}
						backPhotoRef={backPhotoRef}
						setShowInstructionsAlert={setShowInstructionsAlert}
					/>
				</Tab>
				<Tab eventKey="driving" title="Driving">
					<Driving
						forwardPhotoRef={forwardPhotoRef}
						leftPhotoRef={leftPhotoRef}
						rightPhotoRef={rightPhotoRef}
						backPhotoRef={backPhotoRef}
						setShowInstructionsAlert={setShowInstructionsAlert}
					/>
				</Tab>
			</Tabs>
		);
	}
}
