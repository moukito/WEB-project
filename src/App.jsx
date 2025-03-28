import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/footer.jsx'
import Header from './components/Header.jsx'
import Lifestyle from './pages/Lifestyle.jsx'
import Football from './pages/Football.jsx'
import CartPage from './pages/CartPage.jsx'
import ProductTest from './pages/ProductTest.jsx'
import { CartProvider } from './context/CartContext.jsx'
import HomePage from "./HomePage.jsx";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Lifestyle />} />
                            <Route path="/lifestyle" element={<Lifestyle />} />
                            <Route path="/football" element={<Football />} />
                            <Route path="/panier" element={<CartPage />} />
                            <Route path="/test-panier" element={<ProductTest />} />
                        </Routes>
                    </main>
	                <HomePage />
                    <Footer />
                </div>
            </BrowserRouter>
        </CartProvider>
    )
}

export default App;