import "./App.css";
import Play from "./components/Play";
import Topbar from "./components/Topbar";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LastWin from "./components/LastWin";
import AddressContext from "./contexts/addressContext";
import LotteryContext from "./contexts/lotteryContext";
import TokenContext from "./contexts/currentTokenContext";
import LastTokenContext from "./contexts/lastTokenContext";
import { useState } from "react";
import About from "./components/About";
import Player from "./components/Player";
import NftList from "./components/NftList";

function App() {
  const [lottery, setLottery] = useState();
  const [address, setAddress] = useState();
  const [token, setToken] = useState();
  const [lastToken, setLastToken] = useState();
  return (
    <Router>
      <LotteryContext.Provider value={[lottery, setLottery]}>
        <AddressContext.Provider value={[address, setAddress]}>
          <TokenContext.Provider value={[token, setToken]}>
            <LastTokenContext.Provider value={[lastToken, setLastToken]}>
              <Topbar />
              {lottery ? (
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
                    <Route
                      path="/player"
                      element={
                        <div className="App">
                          <Player />
                        </div>
                      }
                    ></Route>{" "}
                    <Route
                      path="/nft"
                      element={
                        <div className="App">
                          <NftList />
                        </div>
                      }
                    ></Route>{" "}
                  </Routes>{" "}
                </>
              ) : (
                <About />
              )}
            </LastTokenContext.Provider>
          </TokenContext.Provider>
        </AddressContext.Provider>{" "}
      </LotteryContext.Provider>{" "}
    </Router>
  );
}

export default App;
