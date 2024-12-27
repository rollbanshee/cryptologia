import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import News from "./pages/news/News";
import Prices from "./pages/Prices";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/news' element={<News />} />
        <Route path='/prices' element={<Prices />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
