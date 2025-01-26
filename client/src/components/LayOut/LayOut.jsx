import React from 'react'
import Header from '../Header/Header.jsx'
import Footer from "../Footer/Footer.jsx"
function LayOut({children}) {
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default LayOut
