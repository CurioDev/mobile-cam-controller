import { Card, Form } from "react-bootstrap";

export default function ParameterCard(props) {
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
			<Form.Select
				defaultValue={props.selectProps.defaultValue}
				onChange={props.selectProps.onChange}
				size="sm"
			>
				{props.selectProps.options.map((option) => (
					<option value={option}>{option}</option>
				))}
			</Form.Select>
		</Card>
	);
}
