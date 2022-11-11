import "./App.css";
import { useState } from "react";
import Game from "./components/Game";
import PresetPage from "./components/PresetPage";

function App() {
  const [state, setState] = useState({
    targetScore: 100,
    gameIsRunning: false,
    players: 2,
    dicesPlaying: 2,
  });

  return (
    <div className="App">
      {!state.gameIsRunning && (
        <PresetPage
          {...state}
          changePresets={(presets) => setState((p) => ({ ...p, ...presets }))}
        />
      )}
      {state.gameIsRunning && <Game {...state} />}
    </div>
  );
}

export default App;
