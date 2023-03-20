import { Button, Card } from 'react-bootstrap';
import blackImage from '../assets/black.gif';

import Camera from './Camera';

export default function Training() {
	return (
		<>
			<Card className="position-absolute start-50 translate-middle-x" style={{width: '25%', top: '6%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>GO FORWARD</Card.Text>
				<Card.Img variant="medium" src={blackImage} />
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>29 examples.</Card.Text>
				<Button className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>
			<Card className="position-absolute start-0 translate-middle-y" style={{width: '25%', top: '53%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>GO FORWARD</Card.Text>
				<Card.Img variant="medium" src={blackImage} />
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>29 examples.</Card.Text>
				<Button className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>

			<Camera />
			
			<Card className="position-absolute end-0 translate-middle-y" style={{width: '25%', top: '53%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>GO FORWARD</Card.Text>
				<Card.Img variant="medium" src={blackImage} />
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>29 examples.</Card.Text>
				<Button className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>
			<Card className="position-absolute bottom-0 start-50 translate-middle-x" style={{width: '25%'}}>
				<Card.Text style={{fontSize: '2.9vw', marginBottom: '0px'}}>GO FORWARD</Card.Text>
				<Card.Img variant="medium" src={blackImage} />
				<Card.Text style={{marginTop: '0px', fontSize: '2vw'}}>29 examples.</Card.Text>
				<Button className='stretched-link' variant="primary" size="sm" style={{fontSize: '2.9vw', marginTop: '-17px'}}>ADD SAMPLE</Button>
			</Card>
		</>
	);
}