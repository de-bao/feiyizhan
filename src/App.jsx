import { useState } from 'react'
import Header from './components/Header'
import News from './components/News'
import Publications from './components/Publications'
import Projects from './components/Projects'
import Podcast from './components/Podcast'
import ReviewerService from './components/ReviewerService'
import ClustrMap from './components/ClustrMap'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-5 py-8">
        <Header />
        <News />
        <Publications />
        <Projects />
        <Podcast />
        <ReviewerService />
        <ClustrMap />
      </div>
    </div>
  )
}

export default App
