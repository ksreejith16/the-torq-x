import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root";
import Home from "../App";
import Portfolio from "../pages/portfolio";
import Contact from "../pages/contact";
import Blog from "../pages/blog";
import { Outlet } from "react-router-dom";
import BlogDetails from "../pages/blog-details";
import AboutUs from "../pages/about-us";
import Team from "../pages/team";
import Pricing from "../pages/pricing";
import NotFound from "../pages/404";
import BlogSidebar from "../pages/blog-sidebar";
import TermsConditions from "../pages/terms-conditions";
import PrivacyPolicy from "../pages/privacy-policy";

import Products from "../pages/Products";
import CaseStudy from "../components/CaseStudy";
import Fetuses from "../components/fetuses";
import ScrollToTop from "../components/ScrollToTop"; 
import TeamComponent from "../components/teamComponent";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/team",
                element: <TeamComponent/>
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/blog-sidebar",
                element: <BlogSidebar />
            },
            {
                path: "/customer-stories",
                element: <CaseStudy />
            },
            {
                path: "/about",
                element: <AboutUs />
            },
            {
                path: "/team",
                element: <TeamComponent />
            },
            {
                path: "/services",
                element: <Fetuses/>
            },
            {
                path:"/terms-conditions",
                element:<TermsConditions/>
            },
            {
                path:"/privacy-policy",
                element:<PrivacyPolicy/>
            },
            {
                path:"/not-found",
                element:<NotFound/>
            }


        ]
    }
])