import { Card, Button } from "react-bootstrap";

export default function AddSampleCard(props) {
	return (
		<Card className="start-50 translate-middle-x" style={{ width: "30vw" }}>
			<Card.Text
				style={{
					fontSize: "2.9vw",
					marginBottom: "0px",
				}}
			>
				{props.title}
			</Card.Text>
			<canvas
				ref={props.photoRef}
				style={{
					width: "100%",
					height: "30vw",
					backgroundColor: "black",
				}}
			></canvas>
			<Card.Text style={{ marginTop: "0px", fontSize: "2vw" }}>
				{props.sampleCount} examples.
			</Card.Text>
			<Button
				onClick={() => props.showAllPhotos(props.type)}
				//className="stretched-link"
				size="sm"
				style={{
					fontSize: "2.9vw",
					marginTop: "-17px",
					backgroundColor: "steelblue",
					borderColor: "steelblue",
				}}
			>
				SHOW ALL PHOTOS
			</Button>
			<Button
				onClick={() => props.addSample(props.type)}
				//className="stretched-link"
				size="sm"
				style={{
					fontSize: "2.9vw",
					marginTop: "-17px",
					backgroundColor: "steelblue",
					borderColor: "steelblue",
				}}
			>
				ADD SAMPLE
			</Button>
		</Card>
	);
}
