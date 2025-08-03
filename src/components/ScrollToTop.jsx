import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/scrolltotop.css";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        isVisible && (
            <button className="scroll-to-top" onClick={scrollToTop}>
                <FaArrowUp />
            </button>
        )
    );
}