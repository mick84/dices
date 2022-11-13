import "./App.css";
import { useState } from "react";
import Game from "./components/Game";
import PresetPage from "./components/PresetPage";
const initState = {
  targetScore: 100,
  gameIsRunning: false,
  players: 3,
  dicesPlaying: 3,
  round: 0,
  forbiddenSeq: 6,
  settingsMode: true,
};
function App() {
  const [state, setState] = useState(initState);
  return (
    <div className="App">
      {state.settingsMode && (
        <PresetPage
          {...state}
          changePresets={(presets) => setState((p) => ({ ...p, ...presets }))}
        />
      )}
      {!state.settingsMode && (
        <Game {...state} gotoSettings={() => setState(() => initState)} />
      )}
    </div>
  );
}
export default App;
