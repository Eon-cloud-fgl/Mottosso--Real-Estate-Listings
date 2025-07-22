import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./pages/home"
import Appraisals from "./pages/appraisals"
import Contact from "./pages/contact"
import Enterprise from "./pages/enterprise"
import Estate from "./pages/estate"
import News from "./pages/news"
import GlobalStyle from "./pages/globalstyle"
import Footer from "./components/Footer"
import Loader from "./components/Loader"
import Login from "./pages/admin/Login"

function App() {
    const [loading, setLoading] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setShowLoader(true)
        setLoading(true)
        const timer = setTimeout(() => setLoading(false), 1200)
        return () => clearTimeout(timer)
    }, [location])

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => setShowLoader(false), 600) // igual al transition
            return () => clearTimeout(timer)
        } else {
            setShowLoader(true)
        }
    }, [loading])

    return (
        <>
            <GlobalStyle />
            <Navbar />
            {showLoader && <Loader visible={loading} />}
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/appraisals" element={<Appraisals />} />
                    <Route path="/contact" element={<Contact />}/>
                    <Route path="/enterprise" element={<Enterprise />} />
                    <Route path="/estate" element={<Estate />}/>
                    <Route path="/news" element={<News />}/>
                    <Route path="/admin/login" element={<Login />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default App
