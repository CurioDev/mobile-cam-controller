import "./App.css";
import Dashboard from "./components/Dashboard";
import { init } from "./services/ModelServices";

function App() {
	init();

	return (
		<div className="App">
			<Dashboard />
		</div>
	);
}

export default App;
