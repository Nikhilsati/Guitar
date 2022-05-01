import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Chords from "./views/chords/Chords";
import Tabs from "./views/tabs/Tabs";

function App() {
  return (
    <div className="App">
      <Header />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "calc(100% - 48px)",
          top: 48,
        }}
      >
        <Switch>
          <Route path="/" exact>
            <p style={{ color: "#fff", fontSize: "3rem" }}>
              Welcome to guitars
            </p>
          </Route>
          <Route path="/Chords" exact>
            <Chords />
          </Route>
          <Route path="/Tabs" exact>
            <Tabs />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
