import React, { useEffect } from 'react'
import Banner from './components/banner'
import Fetuses from './components/fetuses'
import About from './components/about'
import Brands from './components/brands'
import TeamComponent from './components/teamComponent'
import Gallery from './components/gallery'
import Testimonial from './components/testimonial'
import PricingComponent from './components/pricingComponent'
import BlogsComponent from './components/blogsComponent'
import InstagramGallery from './components/instagramGallery'
import { ScrollRestoration } from 'react-router-dom'
import ServicesHome from './pages/ServicesHome'
import CaseStudy from './components/CaseStudy'
import HowWeHelp from './components/HowWeHelp'
import LogoCarousel from './components/LogoCarousel'
const Home = () => {
  return (
    <>
      <Banner />
      <LogoCarousel />

      
      {/* <About /> */}
      {/* <Brands /> */}
     <ServicesHome/>
     <Fetuses />
      <TeamComponent />
      <CaseStudy/>
      <HowWeHelp/>
      {/* <Gallery />
      <Testimonial /> */}
      {/* <PricingComponent /> */}
      {/* <BlogsComponent /> */}
      {/* <InstagramGallery /> */}
      <ScrollRestoration/>
    </>
  )
}

export default Home;