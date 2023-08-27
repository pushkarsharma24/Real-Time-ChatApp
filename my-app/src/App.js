
import './App.css';
import {BrowserRouter as  Router,Routes, Route} from "react-router-dom";
import Join from "./Component/Join/Join";
import Chat from "./Component/Chat/Chat"



function App() {

  return (
    <div className="App">
      <Router>
       <Routes>
        <Route exact path = "/" Component={Join} />
        <Route path = "/chat" Component={Chat}/>

        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
