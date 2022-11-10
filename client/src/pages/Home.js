import React from 'react';
import Button from 'react-bootstrap/esm/Button';
const { v4: uuidv4 } = require('uuid');

export default function Home({ currentPage, handlePageChange }) {
  return (
    <div className="about-wrapper">
      <div className="about-section fw-semibold">
        <ul>
          <li className="list-group-item pt-4">Welcome to [ ARRAY ]!</li>
          <li className="list-group-item pt-4">
            A simple and fun game for all ages!
          </li>
          <li className="list-group-item pt-4">
            Learn how to play below or start your own game!
          </li>
        </ul>
        <div className="button-container pt-5">
          <Button
            type="button"
            className="btn btn-success shadow fs-3 mx-2"
            href={`/lobby/${uuidv4()}`}
          >
            PLAY
          </Button>
          <button type="button" className="btn btn-light shadow fs-3 mx-2">
            LEARN
          </button>
        </div>
      </div>
    </div>
  );
}
