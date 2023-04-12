import { Card, Button } from "react-bootstrap";

export default function AddSampleCard(props) {
	return (
		<Card>
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
				size="sm"
				style={{
					fontSize: "2.9vw",
					marginTop: "-16px",
					backgroundColor: "steelblue",
					borderColor: "steelblue",
				}}
			>
				EDIT IMAGES
			</Button>
			<Button
				onClick={() => props.addSample(props.type)}
				size="sm"
				style={{
					fontSize: "2.9vw",
					marginTop: "1%",
					backgroundColor: "steelblue",
					borderColor: "steelblue",
				}}
			>
				ADD SAMPLE
			</Button>
		</Card>
	);
}
