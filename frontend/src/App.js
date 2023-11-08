import {Outlet} from 'react-router-dom'
import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './component/Header'
import Footer from './component/Footer'
const App = () => {
  return (
    <>

      <Header />
      <main className='py-3'>
        <Container>
         <Outlet/>
        </Container>
      </main>
      <Footer/>
    </>
  )
}

export default App