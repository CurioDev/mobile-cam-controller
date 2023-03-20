import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Training from './Training';

export default function Dashboard() {
	return (
		<Tabs
			defaultActiveKey="training"
			id="justify-tab-example"
			className="mb-3"
			// transition="false"
			justify
		>
			<Tab eventKey="training" title="Training">
				<Training />
			</Tab>
			<Tab eventKey="play" title="Play">
				<Training />
			</Tab>
		</Tabs>
	);
}