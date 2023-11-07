import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
const Header = () => {
    return (
        <header>
            <Navbar expand="lg" bg="dark" variant="dark"  collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/' >
                        Pro shop
                    </Navbar.Brand>
                   <Navbar.Toggle aria-controls="basic-navbar-nav" />
                   <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <Nav.Link href='/cart'>
                            <FaShoppingCart/>Cart
                        </Nav.Link>
                    </Nav>
                    <Nav className='ms-auto'>
                        <Nav.Link href='/login'>
                            <FaUser/>Loggin
                        </Nav.Link>
                    </Nav>
                   </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header