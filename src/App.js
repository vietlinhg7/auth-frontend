import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">AuthApp</Navbar.Brand>
            <Navigation />
          </Container>
        </Navbar>
        <Container className="mt-4">
          <AppRoutes />
        </Container>
      </Router>
    </AuthProvider>
  );
}

// Separate navigation to simplify the App component
function Navigation() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Nav className="me-auto">
      {!isAuthenticated ? (
        <>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Button variant="outline-light" onClick={logout}>Logout</Button>
        </>
      )}
    </Nav>
  );
}

// Separate Routes
function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />} />
    </Routes>
  );
}

export default App;
