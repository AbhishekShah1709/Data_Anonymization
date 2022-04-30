import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import UploadFile from './components/upload_file';
import UploadPolicy from './components/uploadpolicy';
import ManualPolicy from './components/manualpolicy';
import SelectPolicy from './components/select_policy';
import Preview from './components/preview';
import Home from './components/home'
import Anonymatron from './components/anonymatron'

function App() {
  return (
    <Router>
      {/* <div className="App"> */}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      <Routes>
      <Route path="/" exact element={<UploadFile />}></Route>
      <Route path="/uploadpolicy" exact element={<UploadPolicy />}></Route>
      <Route path="/manualpolicy" exact element={<ManualPolicy />}></Route>
      <Route path="/preview" exact element={<Preview />}></Route>
      <Route path="/home" exact element={<Home />}></Route>
      <Route path="/anonymatron" exact element={<Anonymatron />}></Route>
      <Route path="/selectpolicy" exact element={<SelectPolicy/>}></Route>
      </Routes>
     
      {/* </div> */}

    </Router>
  );
}

export default App;
