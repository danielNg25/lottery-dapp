import "./App.css";
import Play from "./components/Play";
import Topbar from "./components/Topbar";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LastWin from "./components/LastWin";
import AddressContext from "./contexts/addressContext";
import LotteryContext from "./contexts/lotteryContext";
import { useState } from "react";
import About from "./components/About";

function App() {
  const [lottery, setLottery] = useState();
  const [address, setAddress] = useState();

  return (
    <Router>
      <LotteryContext.Provider value={[lottery, setLottery]}>
        <AddressContext.Provider value={[address, setAddress]}>
          <Topbar />
          {lottery? (
            <>
              <Header />
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="App">
                      <Play />
                    </div>
                  }
                ></Route>{" "}
                <Route
                  path="/win"
                  element={
                    <div className="App">
                      <LastWin />
                    </div>
                  }
                ></Route>{" "}
              </Routes>{" "}
            </>
          ): <About/>}
        </AddressContext.Provider>{" "}
      </LotteryContext.Provider>{" "}
    </Router>
  );
}

export default App;
