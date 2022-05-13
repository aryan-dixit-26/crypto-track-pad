import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import Header from "./components/Header";
import { makeStyles } from "@material-ui/core";
import { ContextProvider } from "./contexts/headerContext";
import "./App.css";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#19161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
