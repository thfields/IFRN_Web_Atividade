import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'
import FeaturedProducts from '../components/FeaturedProducts'


function HomePage() {

    return (
      <>
       <div>
        <Header />
        <HeroSection />
        <FeaturedProducts />
        <Footer />
      </div>       
      </>
    )
  }
  
  export default HomePage
  