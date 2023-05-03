import {
	Button,
	Card,
	Container,
	Col,
	Image,
	Modal,
	Row,
} from "react-bootstrap";

export default function EditImagesModal(props) {
	return (
		<Modal
			show={props.showEditImages !== "none"}
			onHide={() => props.setShowEditImages("none")}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			scrollable
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Edit Images
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{props.imageList.length > 0 ? (
					<Container className="g-0 overflowY-auto">
						<Row xs={3}>
							{props.imageList.map((image, index) => (
								<Col key={index} style={{ marginTop: "10px" }}>
									<Card>
										<Image src={image.data} />
										<Button
											onClick={() =>
												props.deleteSample(index)
											}
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
				) : (
					"NO IMAGES"
				)}
			</Modal.Body>
		</Modal>
	);
}
