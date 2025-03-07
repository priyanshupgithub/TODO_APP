import "./App.css";
import { BrowserRouter, Route , Routes} from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
