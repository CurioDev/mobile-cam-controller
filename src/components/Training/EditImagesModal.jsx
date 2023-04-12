import {
	Button,
	Card,
	Container,
	Col,
	Image,
	Modal,
	Row,
} from "react-bootstrap";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js/auto";

export default function EditImagesModal(props) {
	return (
		<Modal
			show={props.showEditImages !== "none"}
			onHide={() => props.setShowEditImages("none")}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Edit Images
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container className="g-0 overflowY-auto">
					<Row>
						{props.imageList.map((image, index) => (
							<Col>
								<Card style={{ width: "24vw" }}>
									<Image src={image} />
									<Button
										//onClick={() => props.addSample(props.type)}
										size="sm"
										style={{
											fontSize: "2.9vw",
											marginTop: "-17px",
											backgroundColor: "darkred",
											borderColor: "darkred",
										}}
									>
										DELETE
									</Button>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</Modal.Body>
		</Modal>
	);
}
