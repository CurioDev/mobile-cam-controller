import React, { useRef, useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

import DrivingCamera from "./DrivingCamera";
import { predict } from "../services/ModelServices";
import { connect, disconnect, moveCar } from "../services/RobotServices";

export default function Driving(props) {
	const videoRef = useRef(null);
	const [isPredicting, setIsPredicting] = useState(false);
	const [predictedLabel, setPredictedLabel] = useState(-1);

	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		let intervalId;

		if (isPredicting) {
			intervalId = setInterval(async () => {
				let labelId = await predict(videoRef.current);
				setPredictedLabel(labelId);
				console.log(labelId);
				moveCar(labelId);
			}, 1000);
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [isPredicting]);

	const handlePredict = () => {
		setIsPredicting(!isPredicting);
	};

	const handleConnect = () => {
		if (!isConnected) {
			connect();
		} else {
			disconnect();
		}
		setIsConnected(!isConnected);
	};

	return (
		<Container fluid style={{ padding: "0px" }}>
			<Row style={{ marginTop: "5%" }}>
				<Col>
					<DrivingCamera
						videoRef={videoRef}
						isPredicting={isPredicting}
						isConnected={isConnected}
						handlePredict={handlePredict}
						handleConnect={handleConnect}
						setShowInstructionsAlert={
							props.setShowInstructionsAlert
						}
					/>
				</Col>
			</Row>
			<Row style={{ marginTop: "5%" }}>
				<Col>
					<Card
						className="start-50 translate-middle-x"
						style={
							predictedLabel === 0
								? {
										width: "30vw",
										border: "3px solid",
										borderColor: "lightgreen",
								  }
								: {
										width: "30vw",
								  }
						}
					>
						<Card.Text
							style={{ fontSize: "2.9vw", marginBottom: "0px" }}
						>
							GO FORWARD
						</Card.Text>
						<canvas
							ref={props.forwardPhotoRef}
							style={{
								width: "100%",
								height: "30vw",
								backgroundColor: "black",
							}}
						></canvas>
					</Card>
				</Col>
			</Row>
			<Row className="gx-3" style={{ marginTop: "1%" }}>
				<Col>
					<Card
						style={
							predictedLabel === 2
								? {
										width: "30vw",
										border: "3px solid",
										borderColor: "lightgreen",
								  }
								: {
										width: "30vw",
								  }
						}
					>
						<Card.Text
							style={{ fontSize: "2.9vw", marginBottom: "0px" }}
						>
							TURN LEFT
						</Card.Text>
						<canvas
							ref={props.leftPhotoRef}
							style={{
								width: "100%",
								height: "30vw",
								backgroundColor: "black",
							}}
						></canvas>
					</Card>
				</Col>
				<Col>
					<Card
						style={
							predictedLabel === 1
								? {
										width: "30vw",
										border: "3px solid",
										borderColor: "lightgreen",
								  }
								: {
										width: "30vw",
								  }
						}
					>
						<Card.Text
							style={{ fontSize: "2.9vw", marginBottom: "0px" }}
						>
							GO BACK
						</Card.Text>
						<canvas
							ref={props.backPhotoRef}
							style={{
								width: "100%",
								height: "30vw",
								backgroundColor: "black",
							}}
						></canvas>
					</Card>
				</Col>
				<Col>
					<Card
						style={
							predictedLabel === 3
								? {
										width: "30vw",
										border: "3px solid",
										borderColor: "lightgreen",
								  }
								: {
										width: "30vw",
								  }
						}
					>
						<Card.Text
							style={{ fontSize: "2.9vw", marginBottom: "0px" }}
						>
							TURN RIGHT
						</Card.Text>
						<canvas
							ref={props.rightPhotoRef}
							style={{
								width: "100%",
								height: "30vw",
								backgroundColor: "black",
							}}
						></canvas>
					</Card>
				</Col>
			</Row>
		</Container>
		// <>
		// 	<Card
		// 		className="position-absolute start-50 translate-middle-x"
		// 		style={
		// 			predictedLabel === 0
		// 				? {
		// 						width: "25%",
		// 						border: "3px solid",
		// 						borderColor: "lightgreen",
		// 				  }
		// 				: {
		// 						width: "25%",
		// 				  }
		// 		}
		// 	>
		// 		<Card.Text style={{ fontSize: "2.9vw", marginBottom: "0px" }}>
		// 			GO FORWARD
		// 		</Card.Text>
		// 		<canvas
		// 			ref={props.forwardPhotoRef}
		// 			style={{
		// 				width: "100%",
		// 				height: "25vw",
		// 				backgroundColor: "black",
		// 			}}
		// 		></canvas>
		// 	</Card>

		// 	<Card
		// 		className="position-absolute start-0 translate-middle-y"
		// 		style={
		// 			predictedLabel === 2
		// 				? {
		// 						width: "25%",
		// 						top: "53%",
		// 						border: "3px solid",
		// 						borderColor: "lightgreen",
		// 				  }
		// 				: {
		// 						width: "25%",
		// 						top: "53%",
		// 				  }
		// 		}
		// 	>
		// 		<Card.Text style={{ fontSize: "2.9vw", marginBottom: "0px" }}>
		// 			TURN LEFT
		// 		</Card.Text>
		// 		<canvas
		// 			ref={props.leftPhotoRef}
		// 			style={{
		// 				width: "100%",
		// 				height: "25vw",
		// 				backgroundColor: "black",
		// 			}}
		// 		></canvas>
		// 	</Card>

		// 	<DrivingCamera
		// 		videoRef={videoRef}
		// 		handlePredict={handlePredict}
		// 		isPredicting={isPredicting}
		// 		setShowInstructionsAlert={props.setShowInstructionsAlert}
		// 	/>

		// 	<Card
		// 		className="position-absolute end-0 translate-middle-y"
		// 		style={
		// 			predictedLabel === 3
		// 				? {
		// 						width: "25%",
		// 						top: "53%",
		// 						border: "3px solid",
		// 						borderColor: "lightgreen",
		// 				  }
		// 				: {
		// 						width: "25%",
		// 						top: "53%",
		// 				  }
		// 		}
		// 	>
		// 		<Card.Text style={{ fontSize: "2.9vw", marginBottom: "0px" }}>
		// 			TURN RIGHT
		// 		</Card.Text>
		// 		<canvas
		// 			ref={props.rightPhotoRef}
		// 			style={{
		// 				width: "100%",
		// 				height: "25vw",
		// 				backgroundColor: "black",
		// 			}}
		// 		></canvas>
		// 	</Card>

		// 	<Card
		// 		className="position-absolute bottom-0 start-50 translate-middle-x"
		// 		style={
		// 			predictedLabel === 1
		// 				? {
		// 						width: "25%",
		// 						border: "3px solid",
		// 						borderColor: "lightgreen",
		// 				  }
		// 				: {
		// 						width: "25%",
		// 				  }
		// 		}
		// 	>
		// 		<Card.Text style={{ fontSize: "2.9vw", marginBottom: "0px" }}>
		// 			GO BACK
		// 		</Card.Text>
		// 		<canvas
		// 			ref={props.backPhotoRef}
		// 			style={{
		// 				width: "100%",
		// 				height: "25vw",
		// 				backgroundColor: "black",
		// 			}}
		// 		></canvas>
		// 	</Card>
		// </>
	);
}
