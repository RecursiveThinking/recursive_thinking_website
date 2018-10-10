import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import HeaderApp from '../headerApp/headerApp';
import NavAndContent from '../../containers/navAndContent/navAndContent'
import Footer from '../footer/footer'

const mainApp = () => {
  return (
    <main>
      <HeaderApp />
      <NavAndContent />
      <Footer />
    </main>
  )
}

export default mainApp;