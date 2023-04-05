import { Modal } from "react-bootstrap";
import { Line } from "react-chartjs-2";

export default function LossChartModal(props) {
	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: false,
				text: "Loss Curve",
			},
		},
	};

	const chartData = {
		labels: props.lossHistory.map((value, index) => index + 1),
		datasets: [
			{
				label: "Loss",
				data: props.lossHistory,
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};

	return (
		<Modal
			show={props.showLossCurve}
			onHide={() => props.setShowLossCurve(false)}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Loss Curve
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Line options={chartOptions} data={chartData}></Line>
				<h4>
					Final Loss:{" "}
					{props.lossHistory
						.at(props.lossHistory.length - 1)
						?.toFixed(5)}
				</h4>
			</Modal.Body>
		</Modal>
	);
}
