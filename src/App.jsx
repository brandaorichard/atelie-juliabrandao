import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Hero from './components/Hero'
import RebornCardsSection from './components/RebornCardsSection'
import SocialMediasSection from './components/SocialMediasSection'
import ProductPage from './components/ProductPage' // Crie esse componente!

import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <RebornCardsSection />
            </>
          }
        />
        <Route path="/produto/:id" element={<ProductPage />} />
      </Routes>
      <SocialMediasSection />
    </BrowserRouter>
  );
}

export default App;