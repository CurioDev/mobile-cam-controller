import React, { useRef } from "react";
import { Button, Card } from "react-bootstrap";

import DrivingCamera from "./DrivingCamera";

export default function Driving(props) {
	const videoRef = useRef(null);

	return (
		<>
			<Card
				className="position-absolute start-50 translate-middle-x"
				style={{ width: "25%" }}
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
				style={{ width: "25%", top: "53%" }}
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
				setShowInstructionsAlert={props.setShowInstructionsAlert}
			/>

			<Card
				className="position-absolute end-0 translate-middle-y"
				style={{ width: "25%", top: "53%" }}
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
				style={{ width: "25%" }}
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
