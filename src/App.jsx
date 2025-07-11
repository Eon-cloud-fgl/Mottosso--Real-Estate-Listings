import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./pages/home"
import Appraisals from "./pages/appraisals"
import Contact from "./pages/contact"
import Enterprise from "./pages/enterprise"
import Estate from "./pages/estate"
import News from "./pages/news"
import GlobalStyle from "./pages/globalstyle"
import Footer from "./components/Footer"

function App() {
    return(
    <>
    <GlobalStyle />
        <Navbar />
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/appraisals" element={<Appraisals />} />
                <Route path="/contact" element={<Contact />}/>
                <Route path="/enterprise" element={<Enterprise />} />
                <Route path="/estate" element={<Estate />}/>
                <Route path="/news" element={<News />}/>
            </Routes>
        </div>
        <Footer />
    </>
    )
}

export default App
