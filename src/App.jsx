import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Lifestyle from "./pages/Lifestyle";
import Football from "./pages/Football";
import Header from "./components/Header";
import Footer from "./components/footer";
import HomePage from "./HomePage"
import PriceButton from './components/tab.jsx'


function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                  <Route path="/lifestyle" element={<Lifestyle />} />
                  <Route path="/football" element={<Football />} />
            </Routes>
            <HomePage/>
            <Footer/>
            <PriceButton />
        </Router>
    );
}

export default App;