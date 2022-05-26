import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

const NavbarExample = () => {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/" >Inventario</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/categorias">Categorias</Nav.Link>
                        <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Outlet></Outlet>
            </section>
        </>
    )
}

export default NavbarExample