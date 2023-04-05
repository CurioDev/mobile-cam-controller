import React, { useState, useRef, useEffect } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";

import TrainingCamera from "./TrainingCamera";
import AddSampleCard from "./AddSampleCard";
import { addSampleHandler, train } from "../../services/ModelServices";
import ParameterCard from "./ParameterCard";
import LossChartModal from "./LossChartModal";

export default function Training(props) {
	const videoRef = useRef(null);
	const forwardPhotoRef = useRef(null);
	const leftPhotoRef = useRef(null);
	const rightPhotoRef = useRef(null);
	const backPhotoRef = useRef(null);

	const [forwardSampleCount, setForwardSampleCount] = useState(0);
	const [leftSampleCount, setLeftSampleCount] = useState(0);
	const [rightSampleCount, setRightSampleCount] = useState(0);
	const [backSampleCount, setBackSampleCount] = useState(0);

	const [learningRate, setLearningRate] = useState(0.0001);
	const [batchSize, setBatchSize] = useState(0.4);
	const [epochs, setEpochs] = useState(20);
	const [hiddenUnits, setHiddenUnits] = useState(100);

	const [showDataAlert, setShowDataAlert] = useState(false);
	const [showBatchSizeAlert, setShowBatchSizeAlert] = useState(false);
	const [loss, setLoss] = useState("");
	const [lossHistory, setLossHistory] = useState([]);
	const [showLossCurve, setShowLossCurve] = useState(false);

	const handleLearningRate = (e) => {
		setLearningRate(e.target.value);
	};

	const handleBatchSize = (e) => {
		setBatchSize(e.target.value);
	};

	const handleEpochs = (e) => {
		setEpochs(e.target.value);
	};

	const handleHiddenUnits = (e) => {
		setHiddenUnits(e.target.value);
	};

	const handleTrain = () => {
		train(
			learningRate,
			batchSize,
			epochs,
			hiddenUnits,
			setLoss,
			setShowDataAlert,
			setShowBatchSizeAlert,
			setLossHistory
		);
	};

	const addSample = (position) => {
		const width = 224;
		const height = 224;

		// Label for model training.
		// 0: Forward, 1: Back, 2: Left, 3: Right
		let label;
		let photo;
		let photoDriving;
		if (position === "forward") {
			label = 0;
			photo = forwardPhotoRef.current;
			photoDriving = props.forwardPhotoRef.current;
			setForwardSampleCount(forwardSampleCount + 1);
		} else if (position === "left") {
			label = 2;
			photo = leftPhotoRef.current;
			photoDriving = props.leftPhotoRef.current;
			setLeftSampleCount(leftSampleCount + 1);
		} else if (position === "right") {
			label = 3;
			photo = rightPhotoRef.current;
			photoDriving = props.rightPhotoRef.current;
			setRightSampleCount(rightSampleCount + 1);
		} else {
			label = 1;
			photo = backPhotoRef.current;
			photoDriving = props.backPhotoRef.current;
			setBackSampleCount(backSampleCount + 1);
		}

		let video = videoRef.current;
		photo.width = width;
		photo.height = height;
		photoDriving.width = width;
		photoDriving.height = height;

		let ctx = photo.getContext("2d");
		ctx.scale(-1, 1);
		ctx.drawImage(video, width * -1, 0, width, height);

		let ctxDriving = photoDriving.getContext("2d");
		ctxDriving.scale(-1, 1);
		ctxDriving.drawImage(video, width * -1, 0, width, height);

		addSampleHandler(video, label);
	};

	useEffect(() => {
		if (lossHistory.length > 0) {
			setShowLossCurve(true);
		}
	}, [lossHistory]);

	if (showDataAlert) {
		return (
			<Alert
				variant="danger"
				onClose={() => setShowDataAlert(false)}
				dismissible
			>
				<Alert.Heading>Oh, you got an error!</Alert.Heading>
				<hr />
				<p>Please add some examples before training.</p>
			</Alert>
		);
	} else if (showBatchSizeAlert) {
		return (
			<Alert
				variant="danger"
				onClose={() => setShowBatchSizeAlert(false)}
				dismissible
			>
				<Alert.Heading>Oh, you got an error!</Alert.Heading>
				<hr />
				<p>
					Batch size is 0 or NaN. Please choose a non-zero fraction.
				</p>
			</Alert>
		);
	} else {
		return (
			<Container fluid style={{ padding: "0px" }}>
				<LossChartModal
					lossHistory={lossHistory}
					showLossCurve={showLossCurve}
					setShowLossCurve={setShowLossCurve}
				></LossChartModal>
				<Row className="g-1">
					<Col>
						<ParameterCard
							title="LEARNING RATE"
							selectProps={{
								defaultValue: "0.0001",
								options: [
									"0.00001",
									"0.0001",
									"0.001",
									"0.003",
								],
								onChange: handleLearningRate,
							}}
						></ParameterCard>
					</Col>
					<Col>
						<ParameterCard
							title="BATCH SIZE"
							selectProps={{
								defaultValue: "0.4",
								options: ["0.05", "0.1", "0.4", "1"],
								onChange: handleBatchSize,
							}}
						></ParameterCard>
					</Col>
					<Col>
						<ParameterCard
							title="EPOCHS"
							selectProps={{
								defaultValue: "20",
								options: ["10", "20", "40"],
								onChange: handleEpochs,
							}}
						></ParameterCard>
					</Col>
					<Col>
						<ParameterCard
							title="HIDDEN UNITS"
							selectProps={{
								defaultValue: "100",
								options: ["10", "100", "200"],
								onChange: handleHiddenUnits,
							}}
						></ParameterCard>
					</Col>
				</Row>
				<Row style={{ marginTop: "5%" }}>
					<Col>
						<TrainingCamera
							videoRef={videoRef}
							train={handleTrain}
							loss={loss}
							setShowInstructionsAlert={
								props.setShowInstructionsAlert
							}
						/>
					</Col>
				</Row>
				<Row style={{ marginTop: "5%" }}>
					<Col>
						<AddSampleCard
							type={"forward"}
							title={"GO FORWARD"}
							photoRef={forwardPhotoRef}
							sampleCount={forwardSampleCount}
							addSample={addSample}
						></AddSampleCard>
					</Col>
				</Row>
				<Row className="gx-3" style={{ marginTop: "1%" }}>
					<Col>
						<AddSampleCard
							type={"left"}
							title={"TURN LEFT"}
							photoRef={leftPhotoRef}
							sampleCount={leftSampleCount}
							addSample={addSample}
						></AddSampleCard>
					</Col>
					<Col>
						<AddSampleCard
							type={"back"}
							title={"GO BACK"}
							photoRef={backPhotoRef}
							sampleCount={backSampleCount}
							addSample={addSample}
						></AddSampleCard>
					</Col>
					<Col>
						<AddSampleCard
							type={"right"}
							title={"TURN RIGHT"}
							photoRef={rightPhotoRef}
							sampleCount={rightSampleCount}
							addSample={addSample}
						></AddSampleCard>
					</Col>
				</Row>
			</Container>
		);
	}
}
