import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  function callAPI() {
    fetch("http://localhost:9000/")
      .then((res) => res.json())
      .then((i) => {
        console.log(i[0].user);
        setName(i[0].user);
      });
  }

  function postAPI() {
    axios.post("http://localhost:9000/data", data).then((res) => {
      console.log(res.data);
    });
  }

  function handleChange(e) {
    e.preventDefault();
    let newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(data);
  }

  const [name, setName] = useState("gouri");
  const [data, setData] = useState({ user: "" });
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
        <input id="user" value={data.user} onChange={(e) => handleChange(e)} />
        <button type="button" onClick={() => postAPI()}>
          Push
        </button>
      </header>
    </div>
  );
}

export default App;
