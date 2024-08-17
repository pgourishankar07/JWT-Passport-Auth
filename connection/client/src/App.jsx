import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  function callAPI() {
    fetch("http://localhost:9000/")
      .then((res) => res.json())
      .then((data) => setName(data.user));
  }

  const [name, setName] = useState("gouri");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="App-link" onClick={() => callAPI()}>
          <h1>Name :{name}</h1>
        </button>
      </header>
    </div>
  );
}

export default App;
