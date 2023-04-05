import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import DrivingCamera from "./DrivingCamera";
import { predict } from "../../services/ModelServices";
import { connect, disconnect, moveCar } from "../../services/RobotServices";
import SampleCard from "./SampleCard";

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
					<SampleCard
						title="GO FORWARD"
						isPredicting={predictedLabel === 0}
						forwardPhotoRef={props.forwardPhotoRef}
					></SampleCard>
				</Col>
			</Row>
			<Row className="gx-3" style={{ marginTop: "1%" }}>
				<Col>
					<SampleCard
						title="TURN LEFT"
						isPredicting={predictedLabel === 2}
						forwardPhotoRef={props.leftPhotoRef}
					></SampleCard>
				</Col>
				<Col>
					<SampleCard
						title="GO BACK"
						isPredicting={predictedLabel === 1}
						forwardPhotoRef={props.backPhotoRef}
					></SampleCard>
				</Col>
				<Col>
					<SampleCard
						title="TURN RIGHT"
						isPredicting={predictedLabel === 3}
						forwardPhotoRef={props.rightPhotoRef}
					></SampleCard>
				</Col>
			</Row>
		</Container>
	);
}
