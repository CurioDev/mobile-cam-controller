import React, { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";

export default function Camera(props) {

	const [isVideoAvailable, setIsVideoAvailable] = useState(true);
	
	useEffect(() => {
		const getVideo = () => {
			navigator.mediaDevices
				.getUserMedia({ 
					video: { width: 224, height: 224 }
				})
				.then(stream => {
					let video = props.videoRef.current;
					video.srcObject = stream;
					video.play();
				})
				.catch(err => {
					setIsVideoAvailable(false);
				});
		}
		getVideo();
	}, [props.videoRef]);

	return (
		<Container>
			{isVideoAvailable ?
			<video ref={props.videoRef} style={{width: '100%'}}></video>:
			<Alert variant="danger" className="position-absolute start-50 translate-middle" style={{width: '48%', top: '53%'}}>
				<Alert.Heading>Please enable camera access!</Alert.Heading>
				<hr/>
				<p>
					To use this app, we need to your permission for camera access. You can drive the robot car with your camera.
					Please allow it from the settings.
				</p>
			</Alert>
			}
			
		</Container>
	);
}