import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import RebornCardsSection from './components/RebornCardsSection'
import SocialMediasSection from './components/SocialMediasSection'

import './index.css'

function App() {

  return (
    <div>
      <Header />
      <Hero />
      <RebornCardsSection />
      <SocialMediasSection />
    </div>
  )
}

export default App
