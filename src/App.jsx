import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Appraisals from "./pages/appraisals"
import Contact from "./pages/contact"
import Enterprise from "./pages/enterprise"
import Estate from "./pages/estate"
import News from "./pages/news"
import Footer from "./components/Footer"
import Loader from "./components/Loader"
import Login from "./pages/admin/Login"
import Dashboard from "./pages/admin/dashboard"
import NavbarAdmin from "./components/NavbarAdmin"
import Property from "./pages/property";

function App() {
    const [loading, setLoading] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const location = useLocation()

    const isAdminRoute = location.pathname.startsWith("/admin")
    const ruta = location.pathname;
    const rutaBooleano = ruta === "/admin/dashboard";

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
        <div className='app-container'>
            {!isAdminRoute && <Navbar />}
            {isAdminRoute && rutaBooleano && <NavbarAdmin />}
            {showLoader && <Loader visible={loading} />}
            <div className={isAdminRoute ? "admin-container" : "container"}>
                <Routes>
                    {/*RUTA USUARIO*/}
                    <Route path="/" element={<Home />} />
                    <Route path="/appraisals" element={<Appraisals />} />
                    <Route path="/contact" element={<Contact />}/>
                    <Route path="/enterprise" element={<Enterprise />} />
                    <Route path="/estate" element={<Estate />}/>
                    <Route path="/news" element={<News />}/>
                    <Route path="/property" element={<Property />} />
                    {/*RUTA ADMIN*/}
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
            {!isAdminRoute && <Footer />}
        </div>
    )
}

export default App
