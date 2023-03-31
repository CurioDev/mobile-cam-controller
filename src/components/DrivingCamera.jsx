import React, { useEffect, useState } from "react";
import { Button, Alert, Card } from "react-bootstrap";

export default function DrivingCamera(props) {
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
					video.style.transform = "scale(-1, 1)";
					video.play();
				})
				.catch((err) => {
					console.error(err);
					setIsVideoAvailable(false);
				});
		};
		getVideo();
	}, [props.videoRef]);

	return (
		<Card className="start-50 translate-middle-x" style={{ width: "60%" }}>
			{isVideoAvailable ? (
				<>
					<Button
						onClick={props.handleConnect}
						variant={props.isConnected ? "danger" : "success"}
						size="lg"
						style={{ fontSize: "3.5vw", marginBottom: "4%" }}
					>
						{props.isConnected ? "DISCONNECT" : "CONNECT TO ROBOT"}
					</Button>
					<Button
						onClick={props.handlePredict}
						variant={props.isPredicting ? "danger" : "success"}
						size="lg"
						style={{ fontSize: "3.5vw", marginBottom: "4%" }}
					>
						{props.isPredicting ? "STOP" : "START"}
					</Button>
					<video
						ref={props.videoRef}
						style={{ width: "100%" }}
					></video>
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
