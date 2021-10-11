import React from 'react'
import Nav from './Nav/nav'
import Header from './Header/header'
import About from './About/About'
import Services from './Services/Services'
import Contact from './Contact/Contact'
import Premium from './Premium/Premium'


const Home = () => {
   

    
    return (
        <div className='app'>
            <Nav/>
            <Header />
            <About />
            <Services />
            <Premium />
            <Contact />
        </div>
    )
}

export default Home
