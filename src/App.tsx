import "./App.css";
import { useState } from "react";
import { Home, Login } from "./pages";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  if (!isAuth) {
    return <Login onSuccess={() => setIsAuth(true)} />;
  }

  return <Home />;
}

export default App;
