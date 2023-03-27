import React, { useEffect, useState } from "react";
import { Button, Alert, Card } from "react-bootstrap";

export default function Camera(props) {
	const [isVideoAvailable, setIsVideoAvailable] = useState(true);

	useEffect(() => {
		const getVideo = () => {
			navigator.mediaDevices
				.getUserMedia({
					video: { width: 224, height: 224 },
				})
				.then((stream) => {
					let video = props.videoRef.current;
					video.srcObject = stream;
					video.play();
				})
				.catch((err) => {
					setIsVideoAvailable(false);
				});
		};
		getVideo();
	}, [props.videoRef]);

	return (
		<Card
			className="position-absolute start-50 translate-middle"
			style={{ width: "48%", top: "53%" }}
		>
			{isVideoAvailable ? (
				<>
					<Button
						className="stretched-link"
						variant="primary"
						size="lg"
						style={{ fontSize: "3.5vw", marginBottom: "4%" }}
					>
						SHOW INSTRUCTIONS
					</Button>
					<video
						ref={props.videoRef}
						style={{ width: "100%" }}
					></video>
					<Button
						onClick={props.train}
						className="stretched-link"
						// {props.loss === "" ? variant="success" : props.loss}

						size="lg"
						style={{ fontSize: "3.5vw", marginTop: "4%" }}
					>
						{props.loss === "" ? <>TRAIN</> : props.loss}
					</Button>
				</>
			) : (
				<Alert
					variant="danger"
					className="position-absolute start-50 translate-middle"
					style={{
						fontSize: "3.5vw",
						width: "100%",
						top: "53%",
						paddingBottom: "0px",
					}}
				>
					<Alert.Heading>Please enable camera access!</Alert.Heading>
					<p>
						To use this app, we need to your permission for camera
						access. You can drive the robot car with your camera.
						Please allow it from your browser settings.
					</p>
				</Alert>
			)}
		</Card>
	);
}
