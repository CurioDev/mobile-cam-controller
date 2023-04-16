import React, { useState, useRef, useEffect } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";

import TrainingCamera from "./TrainingCamera";
import AddSampleCard from "./AddSampleCard";
import { addSampleHandler, train } from "../../services/ModelServices";
import ParameterCard from "./ParameterCard";
import LossChartModal from "./LossChartModal";
import EditImagesModal from "./EditImagesModal";

export default function Training(props) {
	const videoRef = useRef(null);
	const forwardPhotoRef = useRef(null);
	const leftPhotoRef = useRef(null);
	const rightPhotoRef = useRef(null);
	const backPhotoRef = useRef(null);

	const [forwardImageList, setForwardImageList] = useState([]);
	const [leftImageList, setLeftImageList] = useState([]);
	const [rightImageList, setRightImageList] = useState([]);
	const [backImageList, setBackImageList] = useState([]);

	const [learningRate, setLearningRate] = useState(0.0001);
	const [batchSize, setBatchSize] = useState(0.4);
	const [epochs, setEpochs] = useState(20);
	const [hiddenUnits, setHiddenUnits] = useState(100);

	const [showDataAlert, setShowDataAlert] = useState(false);
	const [showBatchSizeAlert, setShowBatchSizeAlert] = useState(false);
	const [loss, setLoss] = useState("");
	const [lossHistory, setLossHistory] = useState([]);
	const [showLossCurve, setShowLossCurve] = useState(false);

	const [showEditImages, setShowEditImages] = useState("none");

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
		// if I use the list method I should clear the dataset first here.
		let forwardLoadpromises = forwardImageList.map((url) =>
			loadImageFromBase64(url, 0)
		);

		Promise.all(forwardLoadpromises)
			.then(() => {
				let leftLoadpromises = leftImageList.map((url) =>
					loadImageFromBase64(url, 2)
				);
				Promise.all(leftLoadpromises)
					.then(() => {
						let rightLoadpromises = rightImageList.map((url) =>
							loadImageFromBase64(url, 3)
						);
						Promise.all(rightLoadpromises)
							.then(() => {
								let backLoadpromises = backImageList.map(
									(url) => loadImageFromBase64(url, 1)
								);
								Promise.all(backLoadpromises)
									.then(() => {
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
									})
									.catch(function (err) {
										console.log(
											"One or more images did not load"
										);
									});
							})
							.catch(function (err) {
								console.log("One or more images did not load");
							});
					})
					.catch(function (err) {
						console.log("One or more images did not load");
					});
			})
			.catch(function (err) {
				console.log("One or more images did not load");
			});
	};

	function loadImageFromBase64(url, label) {
		return new Promise(function (resolve, reject) {
			var img = new Image();
			img.src = url;
			img.onload = function () {
				//addSampleHandler(img, label);
				resolve(img);
			};
			img.onerror = reject;
		});
	}

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
		} else if (position === "left") {
			label = 2;
			photo = leftPhotoRef.current;
			photoDriving = props.leftPhotoRef.current;
		} else if (position === "right") {
			label = 3;
			photo = rightPhotoRef.current;
			photoDriving = props.rightPhotoRef.current;
		} else {
			label = 1;
			photo = backPhotoRef.current;
			photoDriving = props.backPhotoRef.current;
		}

		const video = videoRef.current;
		photo.width = width;
		photo.height = height;
		photoDriving.width = width;
		photoDriving.height = height;

		let ctx = photo.getContext("2d");
		ctx.scale(-1, 1);
		ctx.drawImage(video, width * -1, 0, width, height);
		ctx.setTransform(1, 0, 0, 1, 0, 0);

		let ctxDriving = photoDriving.getContext("2d");
		ctxDriving.scale(-1, 1);
		ctxDriving.drawImage(video, width * -1, 0, width, height);
		ctxDriving.setTransform(1, 0, 0, 1, 0, 0);

		if (position === "forward") {
			setForwardImageList((oldList) => [...oldList, photo.toDataURL()]);
		} else if (position === "left") {
			setLeftImageList((oldList) => [...oldList, photo.toDataURL()]);
		} else if (position === "right") {
			setRightImageList((oldList) => [...oldList, photo.toDataURL()]);
		} else {
			setBackImageList((oldList) => [...oldList, photo.toDataURL()]);
		}

		addSampleHandler(video, label);
	};

	const deleteSample = (index) => {
		if (showEditImages === "forward") {
			if (index === 0 && forwardImageList.length === 1) {
				let ctx = forwardPhotoRef.current.getContext("2d");
				ctx.fillStyle = "black";
				ctx.fillRect(0, 0, 224, 224);

				let ctxDriving = props.forwardPhotoRef.current.getContext("2d");
				ctxDriving.fillStyle = "black";
				ctxDriving.fillRect(0, 0, 224, 224);
			} else if (index === forwardImageList.length - 1) {
				var tempImage = new Image();
				tempImage.onload = function () {
					let ctx = forwardPhotoRef.current.getContext("2d");
					ctx.drawImage(tempImage, 0, 0);

					let ctxDriving =
						props.forwardPhotoRef.current.getContext("2d");
					ctxDriving.drawImage(tempImage, 0, 0);
				};
				tempImage.src = forwardImageList[index - 1];
			}

			setForwardImageList((images) =>
				images.filter((image, imageindex) => imageindex !== index)
			);
		} else if (showEditImages === "left") {
			if (index === 0 && leftImageList.length === 1) {
				let ctx = leftPhotoRef.current.getContext("2d");
				ctx.fillStyle = "black";
				ctx.fillRect(0, 0, 224, 224);

				let ctxDriving = props.leftPhotoRef.current.getContext("2d");
				ctxDriving.fillStyle = "black";
				ctxDriving.fillRect(0, 0, 224, 224);
			} else if (index === leftImageList.length - 1) {
				var tempImage = new Image();
				tempImage.onload = function () {
					let ctx = leftPhotoRef.current.getContext("2d");
					ctx.drawImage(tempImage, 0, 0);

					let ctxDriving =
						props.leftPhotoRef.current.getContext("2d");
					ctxDriving.drawImage(tempImage, 0, 0);
				};
				tempImage.src = leftImageList[index - 1];
			}

			setLeftImageList((images) =>
				images.filter((image, imageindex) => imageindex !== index)
			);
		} else if (showEditImages === "right") {
			if (index === 0 && rightImageList.length === 1) {
				let ctx = rightPhotoRef.current.getContext("2d");
				ctx.fillStyle = "black";
				ctx.fillRect(0, 0, 224, 224);

				let ctxDriving = props.rightPhotoRef.current.getContext("2d");
				ctxDriving.fillStyle = "black";
				ctxDriving.fillRect(0, 0, 224, 224);
			} else if (index === rightImageList.length - 1) {
				var tempImage = new Image();
				tempImage.onload = function () {
					let ctx = rightPhotoRef.current.getContext("2d");
					ctx.drawImage(tempImage, 0, 0);

					let ctxDriving =
						props.rightPhotoRef.current.getContext("2d");
					ctxDriving.drawImage(tempImage, 0, 0);
				};
				tempImage.src = rightImageList[index - 1];
			}

			setRightImageList((images) =>
				images.filter((image, imageindex) => imageindex !== index)
			);
		} else if (showEditImages === "back") {
			if (index === 0 && backImageList.length === 1) {
				let ctx = backPhotoRef.current.getContext("2d");
				ctx.fillStyle = "black";
				ctx.fillRect(0, 0, 224, 224);

				let ctxDriving = props.backPhotoRef.current.getContext("2d");
				ctxDriving.fillStyle = "black";
				ctxDriving.fillRect(0, 0, 224, 224);
			} else if (index === backImageList.length - 1) {
				var tempImage = new Image();
				tempImage.onload = function () {
					let ctx = backPhotoRef.current.getContext("2d");
					ctx.drawImage(tempImage, 0, 0);

					let ctxDriving =
						props.backPhotoRef.current.getContext("2d");
					ctxDriving.drawImage(tempImage, 0, 0);
				};
				tempImage.src = backImageList[index - 1];
			}

			setBackImageList((images) =>
				images.filter((image, imageindex) => imageindex !== index)
			);
		}
	};

	const handleShowAllPhotos = (position) => {
		setShowEditImages(position);
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
				<EditImagesModal
					imageList={
						showEditImages === "forward"
							? forwardImageList
							: showEditImages === "left"
							? leftImageList
							: showEditImages === "right"
							? rightImageList
							: backImageList
					}
					showEditImages={showEditImages}
					setShowEditImages={setShowEditImages}
					deleteSample={deleteSample}
				></EditImagesModal>
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
				<Row style={{ marginTop: "2%" }}>
					<Col>
						<TrainingCamera
							buttonDisabled={
								forwardImageList.length === 0 ||
								leftImageList.length === 0 ||
								rightImageList.length === 0 ||
								backImageList.length === 0
							}
							videoRef={videoRef}
							train={handleTrain}
							loss={loss}
							setShowInstructionsAlert={
								props.setShowInstructionsAlert
							}
						/>
					</Col>
				</Row>
				<Row xs={3} className="gx-3" style={{ marginTop: "2%" }}>
					<Col></Col>
					<Col>
						<AddSampleCard
							type={"forward"}
							title={"GO FORWARD"}
							photoRef={forwardPhotoRef}
							sampleCount={forwardImageList.length}
							showAllPhotos={handleShowAllPhotos}
							addSample={addSample}
						></AddSampleCard>
					</Col>
					<Col></Col>
				</Row>
				<Row xs={3} className="gx-3" style={{ marginTop: "1%" }}>
					<Col>
						<AddSampleCard
							type={"left"}
							title={"TURN LEFT"}
							photoRef={leftPhotoRef}
							sampleCount={leftImageList.length}
							showAllPhotos={handleShowAllPhotos}
							addSample={addSample}
						></AddSampleCard>
					</Col>
					<Col>
						<AddSampleCard
							type={"back"}
							title={"GO BACK"}
							photoRef={backPhotoRef}
							sampleCount={backImageList.length}
							showAllPhotos={handleShowAllPhotos}
							addSample={addSample}
						></AddSampleCard>
					</Col>
					<Col>
						<AddSampleCard
							type={"right"}
							title={"TURN RIGHT"}
							photoRef={rightPhotoRef}
							sampleCount={rightImageList.length}
							showAllPhotos={handleShowAllPhotos}
							addSample={addSample}
						></AddSampleCard>
					</Col>
				</Row>
			</Container>
		);
	}
}
