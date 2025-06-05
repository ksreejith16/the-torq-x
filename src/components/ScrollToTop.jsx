import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    useEffect(() => {
        const handleClick = (event) => {
            const links = document.querySelectorAll("a");
            links.forEach((link) => {
                link.addEventListener("click", (e) => {
                    if (link.getAttribute("href") === window.location.pathname) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                });
            });
        };

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return null;
};

export default ScrollToTop;
