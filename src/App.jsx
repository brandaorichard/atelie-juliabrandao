import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Hero from './components/Hero'
import RebornCardsSection from './components/RebornCardsSection'
import SocialMediasSection from './components/SocialMediasSection'
import ProductPage from './components/ProductPage'
import ScrollToTop from './components/ScrollToTop' // Importe aqui

import './index.css'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Adicione aqui */}
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