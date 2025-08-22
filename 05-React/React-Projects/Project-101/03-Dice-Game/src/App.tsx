import { Outlet } from "react-router-dom";
import { GameProvider } from "./components/context";

export default function App() {
  return (
    <GameProvider>
      <Outlet />
    </GameProvider>
  );
}
