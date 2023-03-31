import React, { useRef, useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

import DrivingCamera from "./DrivingCamera";
import { predict } from "../services/ModelServices";

export default function Driving(props) {
	const videoRef = useRef(null);
	const timerRef = useRef(null);
	const [isPredicting, setIsPredicting] = useState(false);
	const [predictedLabel, setPredictedLabel] = useState(-1);

	useEffect(() => {
		let intervalId;

		if (isPredicting) {
			intervalId = setInterval(async () => {
				let labelId = await predict(videoRef.current);
				setPredictedLabel(labelId);
				console.log(labelId);
			}, 100);
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [isPredicting]);

	const handlePredict = () => {
		setIsPredicting(!isPredicting);
	};

	return (
		<>
			<Card
				className="position-absolute start-50 translate-middle-x"
				style={
					predictedLabel === 0
						? {
								width: "25%",
								border: "3px solid",
								borderColor: "lightgreen",
						  }
						: {
								width: "25%",
						  }
				}
			>
				<Card.Text style={{ fontSize: "2.9vw", marginBottom: "0px" }}>
					GO FORWARD
				</Card.Text>
				<canvas
					ref={props.forwardPhotoRef}
					style={{
						width: "100%",
						height: "25vw",
						backgroundColor: "black",
					}}
				></canvas>
			</Card>

			<Card
				className="position-absolute start-0 translate-middle-y"
				style={
					predictedLabel === 2
						? {
								width: "25%",
								top: "53%",
								border: "3px solid",
								borderColor: "lightgreen",
						  }
						: {
								width: "25%",
								top: "53%",
						  }
				}
			>
				<Card.Text style={{ fontSize: "2.9vw", marginBottom: "0px" }}>
					TURN LEFT
				</Card.Text>
				<canvas
					ref={props.leftPhotoRef}
					style={{
						width: "100%",
						height: "25vw",
						backgroundColor: "black",
					}}
				></canvas>
			</Card>

			<DrivingCamera
				videoRef={videoRef}
				handlePredict={handlePredict}
				isPredicting={isPredicting}
				setShowInstructionsAlert={props.setShowInstructionsAlert}
			/>

			<Card
				className="position-absolute end-0 translate-middle-y"
				style={
					predictedLabel === 3
						? {
								width: "25%",
								top: "53%",
								border: "3px solid",
								borderColor: "lightgreen",
						  }
						: {
								width: "25%",
								top: "53%",
						  }
				}
			>
				<Card.Text style={{ fontSize: "2.9vw", marginBottom: "0px" }}>
					TURN RIGHT
				</Card.Text>
				<canvas
					ref={props.rightPhotoRef}
					style={{
						width: "100%",
						height: "25vw",
						backgroundColor: "black",
					}}
				></canvas>
			</Card>

			<Card
				className="position-absolute bottom-0 start-50 translate-middle-x"
				style={
					predictedLabel === 1
						? {
								width: "25%",
								border: "3px solid",
								borderColor: "lightgreen",
						  }
						: {
								width: "25%",
						  }
				}
			>
				<Card.Text style={{ fontSize: "2.9vw", marginBottom: "0px" }}>
					GO BACK
				</Card.Text>
				<canvas
					ref={props.backPhotoRef}
					style={{
						width: "100%",
						height: "25vw",
						backgroundColor: "black",
					}}
				></canvas>
			</Card>
		</>
	);
}
