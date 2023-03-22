import React, { useRef, useState } from "react";
import { Button, Card } from 'react-bootstrap';

import Camera from './Camera';
import { addSampleHandler } from "../services/ModelServices";

export default function Training() {

	const videoRef = useRef(null);
	const forwardPhotoRef = useRef(null);
	const leftPhotoRef = useRef(null);
	const rightPhotoRef = useRef(null);
	const backPhotoRef = useRef(null);

	const [forwardSampleCount, setForwardSampleCount] = useState(0);
	const [leftSampleCount, setLeftSampleCount] = useState(0);
	const [rightSampleCount, setRightSampleCount] = useState(0);
	const [backSampleCount, setBackSampleCount] = useState(0);

	const addSample = (position) => {
		const width = 224;
		const height = 224;

		// Label for model training.
		// 0: Forward, 1: Back, 2: Left, 3: Right
		let label;
		let photo;
		if (position === 'forward') {
			label = 0;
			photo = forwardPhotoRef.current;
			setForwardSampleCount(forwardSampleCount + 1);
		} else if (position === 'left') {
			label = 2;
			photo = leftPhotoRef.current;
			setLeftSampleCount(leftSampleCount + 1);
		} else if (position === 'right') {
			label = 3;
			photo = rightPhotoRef.current;
			setRightSampleCount(rightSampleCount + 1);
		} else {
			label = 1;
			photo = backPhotoRef.current;
			setBackSampleCount(backSampleCount + 1);
		}

		let video = videoRef.current;
		photo.width = width;
		photo.height = height;
	
		let ctx = photo.getContext('2d');
		ctx.drawImage(video, 0, 0, width, height);

		addSampleHandler(video, label);
	}

	return (
		<>
			<Card className="position-absolute start-50 translate-middle-x" style={{width: '25%', top: '6%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>GO FORWARD</Card.Text>
				<canvas ref={forwardPhotoRef} style={{width: '100%', height: '25vw', backgroundColor: 'black'}}></canvas>
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>{forwardSampleCount} examples.</Card.Text>
				<Button onClick={() => addSample('forward')} className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>
			<Card className="position-absolute start-0 translate-middle-y" style={{width: '25%', top: '53%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>TURN LEFT</Card.Text>
				<canvas ref={leftPhotoRef} style={{width: '100%', height: '25vw', backgroundColor: 'black'}}></canvas>
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>{leftSampleCount} examples.</Card.Text>
				<Button onClick={() => addSample('left')} className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>

			<Camera videoRef={videoRef}/>
			
			<Card className="position-absolute end-0 translate-middle-y" style={{width: '25%', top: '53%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>TURN RIGHT</Card.Text>
				<canvas ref={rightPhotoRef} style={{width: '100%', height: '25vw', backgroundColor: 'black'}}></canvas>
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>{rightSampleCount} examples.</Card.Text>
				<Button onClick={() => addSample('right')} className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>
			<Card className="position-absolute bottom-0 start-50 translate-middle-x" style={{width: '25%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>GO BACK</Card.Text>
				<canvas ref={backPhotoRef} style={{width: '100%', height: '25vw', backgroundColor: 'black'}}></canvas>
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>{backSampleCount} examples.</Card.Text>
				<Button onClick={() => addSample('back')} className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>
		</>
	);
}