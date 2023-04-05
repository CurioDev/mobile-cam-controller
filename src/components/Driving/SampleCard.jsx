import { Card } from "react-bootstrap";

export default function SampleCard(props) {
	return (
		<Card
			className="start-50 translate-middle-x"
			style={
				props.isPredicted
					? {
							width: "30vw",
							border: "3px solid",
							borderColor: "lightgreen",
					  }
					: {
							width: "30vw",
					  }
			}
		>
			<Card.Text style={{ fontSize: "2.9vw", marginBottom: "0px" }}>
				{props.title}
			</Card.Text>
			<canvas
				ref={props.forwardPhotoRef}
				style={{
					width: "100%",
					height: "30vw",
					backgroundColor: "black",
				}}
			></canvas>
		</Card>
	);
}
