import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import Registro from './components/sections/Registro'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* flex-grow empuja el footer hacia abajo */}
      <main className="flex-grow">
        <Hero />
        <Registro />
      </main>
      
      <Footer />
    </div>
  )
}

export default App