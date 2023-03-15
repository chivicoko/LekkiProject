import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProperty from "./AddProperty";
import DisplayProperty from "./DisplayProperty";
import Home from "./Home";
import NavBar from "./NavBar";
import Properties from "./Properties";
import UpdateProperty from "./UpdateProperty";
import NoMatch from "./NoMatch";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element = {<Home />} />
          <Route path="/properties" element = {<Properties />} />
          <Route path="/add_property" element = {<AddProperty />} />
          <Route path="/property" element = {<DisplayProperty />} />
          <Route path="/update_property" element = {<UpdateProperty />} />
          <Route path="*" element= {<NoMatch/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
