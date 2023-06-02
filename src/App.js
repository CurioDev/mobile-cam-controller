import "./App.css";
import Dashboard from "./components/Dashboard";
import { init } from "./services/ModelServices";
import { joinRoom } from "trystero";

const queryParams = new URLSearchParams(window.location.search);
const roomID = queryParams.get("roomID") ?? undefined;

const sendMessage = roomID
	? joinRoom({ appId: "Curio-Drive-By-Image" }, roomID).makeAction(
			"message"
	  )[0]
	: undefined;
// console.log(sendMessage, roomID, queryParams);

function App() {
	init();

	return (
		<div className="App">
			<Dashboard sendMessage={sendMessage} />
		</div>
	);
}

export default App;
