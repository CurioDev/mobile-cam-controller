import './App.css';
import Dashboard from "./components/Dashboard";
import { init, truncatedMobileNet } from "./services/ModelServices";

function App() {

	init().then( () => {console.log(truncatedMobileNet);})
	

	return (
		<div className="App">
			<Dashboard/>
		</div>
	);
}

export default App;
