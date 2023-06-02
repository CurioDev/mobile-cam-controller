import "./App.css";
import Dashboard from "./components/Dashboard";
import { init } from "./services/ModelServices";
import Peer from "peerjs";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

function Home() {
	return (
		<div className="App">
			<Dashboard sendMessage={undefined} />
		</div>
	);
}

function HomePeer() {
	const { roomID } = useParams();
	const peer = new Peer(); // Create PeerJS instance
	const [connection, setConnection] = useState(); // Store the connection
	const [isPeerConnected, setIsPeerConnected] = useState(false);

	const peerConnection = () => {
		if (roomID) {
			console.log(roomID);

			const conn = peer.connect(roomID);
			setConnection(conn);
			console.log(conn);
			setIsPeerConnected(true);
		}
	};

	const sendMessage = (data) => {
		if (connection) {
			console.log(data);

			connection.send(data); // Send the message to the receiver
		}
	};

	return (
		<div className="App">
			{isPeerConnected ? (
				<Dashboard sendMessage={sendMessage} />
			) : (
				<Button
					onClick={() => {
						peerConnection();
					}}
					style={{
						backgroundColor: "green",
						marginTop: 200,
					}}
				>
					CONNECT TO THE HOST DEVICE
				</Button>
			)}
		</div>
	);
}

function App() {
	init();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:roomID" element={<HomePeer />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
