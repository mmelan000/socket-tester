import React from 'react';
import { Link } from 'react-router-dom';
import ThoughtForm from './ThoughtForm';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return (
      <div>
        <h3>No Thoughts Yet</h3>
        <ThoughtForm />
      </div>
    );
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className='card mb-3'>
            <div className='card-body bg-light p-2'>
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className='btn btn-primary btn-block btn-squared'
              to={`/thoughts/${thought._id}`}
            >
              Join the discussion on this post.
            </Link>
          </div>
        ))}
      <div>
        <ThoughtForm />
      </div>
    </div>
  );
};

export default ThoughtList;
