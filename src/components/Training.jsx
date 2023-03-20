import React, {useRef, useEffect, useState} from "react";
import { Button, Card } from 'react-bootstrap';
import blackImage from '../assets/black.gif';

import Camera from './Camera';

export default function Training() {

	const videoRef = useRef(null);
	const forwardPhotoRef = useRef(null);
	const leftPhotoRef = useRef(null);
	const rightPhotoRef = useRef(null);
	const backPhotoRef = useRef(null);

	const addSample = (position) => {
		const width = 500;
		const height = 500;
		
		let photo;
		if (position === 'forward') {
			photo = forwardPhotoRef.current;
		} else if (position === 'left') {
			photo = leftPhotoRef.current;
		} else if (position === 'right') {
			photo = rightPhotoRef.current;
		} else {
			photo = backPhotoRef.current;
		}

		let video = videoRef.current;
		photo.width = width;
		photo.height = height;
	
		let ctx = photo.getContext('2d');
		ctx.drawImage(video, 0, 0, width, height);

		// TODO: Store the images and increase the example number.
	}

	return (
		<>
			<Card className="position-absolute start-50 translate-middle-x" style={{width: '25%', top: '6%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>GO FORWARD</Card.Text>
				<canvas ref={forwardPhotoRef} style={{width: '100%', height: '25vw'}}></canvas>
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>29 examples.</Card.Text>
				<Button onClick={() => addSample('forward')} className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>
			<Card className="position-absolute start-0 translate-middle-y" style={{width: '25%', top: '53%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>TURN LEFT</Card.Text>
				<canvas ref={leftPhotoRef} style={{width: '100%', height: '25vw'}}></canvas>
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>29 examples.</Card.Text>
				<Button onClick={() => addSample('left')} className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>

			<Camera videoRef={videoRef}/>
			
			<Card className="position-absolute end-0 translate-middle-y" style={{width: '25%', top: '53%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>TURN RIGHT</Card.Text>
				<canvas ref={rightPhotoRef} style={{width: '100%', height: '25vw'}}></canvas>
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>29 examples.</Card.Text>
				<Button onClick={() => addSample('right')} className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>
			<Card className="position-absolute bottom-0 start-50 translate-middle-x" style={{width: '25%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>GO BACK</Card.Text>
				<canvas ref={backPhotoRef} style={{width: '100%', height: '25vw'}}></canvas>
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>29 examples.</Card.Text>
				<Button onClick={() => addSample('back')} className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>
		</>
	);
}