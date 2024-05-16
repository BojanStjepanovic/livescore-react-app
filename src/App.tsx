import { useState } from "react";
import "./App.css";
import { AppRouter } from "./routes/app-router.tsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
