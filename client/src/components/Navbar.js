import React, { useState } from 'react';
import logo from '../images/ArrayLogo.png';
import Login from '../pages/Login';
import Button from 'react-bootstrap/Button';
import Auth from '../utils/auth';

function Navbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg fs-1 text-light">
      <div className="container-fluid">
        <a id="array-brand" href="/">
          <img
            className="logo"
            src={logo}
            alt="Array the game logo a diamond shape with 4 colors (yellow at the top, green to the right, blue to the bottom, red to the left) and the letter 'A' in front"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav d-flex justify-content-center align-items-end">
            <li className="nav-item">
              <Button
                type="button"
                className="btn btn-dark mx-2"
                href="/forums"
              >
                Forums
              </Button>
            </li>
            <li className="nav-item">
              {Auth.loggedIn() ? (
                <button
                  type="button"
                  className="btn btn-dark mx-2"
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-dark mx-2"
                  onClick={() => handleShow()}
                  href="#Login"
                  data-bs-target="#login"
                >
                  Login / Sign Up
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Login show={show} handleClose={handleClose} />
    </nav>
  );
}

export default Navbar;
