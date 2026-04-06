import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDmStore } from '../store/useDmStore'

import Hero from '../components/normal/Hero'
import About from '../components/normal/About'
import Feature from '../components/normal/Feature'
import Team from '../components/normal/Team'
import NavBar from '../components/normal/NavBar'
import Footer from '../components/normal/Footer'

const HomePage = () => {

  const currentUser = useDmStore((state) => state.currentUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate("/home")
    }
  }, [currentUser])

  return (
    <div className='relative bg-black text-white'>
      <NavBar />
      <Hero />
      <About />
      <Feature />
      <Team />
      <Footer />
    </div>
  )
}

export default HomePage