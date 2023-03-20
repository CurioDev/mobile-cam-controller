import React, {useRef, useEffect, useState} from "react";
import { Container } from "react-bootstrap";

export default function Camera(props) {
	
	const getVideo = () => {
		navigator.mediaDevices
			.getUserMedia({ 
				video: { width: 720, height: 720 }
			})
			.then(stream => {
				let video = props.videoRef.current;
				video.srcObject = stream;
				video.play();
			})
			.catch(err => {
				console.error(err);
			});
	}

	useEffect(() => {
		getVideo();
	}, [props.videoRef]);

	return (
		<Container>
			<video ref={props.videoRef} className="position-absolute start-50 translate-middle" style={{width: '48%', top: '53%'}}></video>
		</Container>
	);
}