import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = (props) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [login, { data }] = useMutation(LOGIN_USER);
  const [addUser, { addError }] = useMutation(ADD_USER); //, { , addData  } pulled out of brackets
  const [toggleState, setToggleState] = useState(false);
  const [error, setError] = useState('');

  const isValidEmail = (email) => {
    const regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    return regex.test(String(email).toLowerCase());
  };

  const isValidPassword = (password) => {
    if (password.length < 8) {
      return false;
    }
    return true;
  };
  const loginFormHandler = async (event) => {
    event.preventDefault();

    try {
      if (!toggleState) {
        const { data } = await login({
          variables: { ...formState },
        });
        Auth.login(data.login.token);
      } else {
        const { data } = await addUser({
          variables: { ...formState },
        });
        Auth.login(data.addUser.token);
      }
    } catch (e) {
      setError(e);
    }

    setFormState({
      email: '',
      password: '',
      username: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      {data ? (
        <p>
          Success! You may now head <Link to='/'> back to the homepage.</Link>
        </p>
      ) : (
        <Modal show={props.show} onHide={props.handleClose}>
          {toggleState ? (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={loginFormHandler}>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name='email'
                      type='email'
                      value={formState.email}
                      // controlid='email-login'
                      onChange={handleChange}
                      placeholder='Enter email'
                      onMouseOut={() => {
                        if (!formState.email) {
                          setError('* Email is required');
                          return;
                        }
                        if (!isValidEmail(formState.email)) {
                          setError('* Please enter a valid Email');
                          return;
                        }
                      }}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      name='username'
                      type='username'
                      value={formState.username}
                      // controlid='password-login'
                      onChange={handleChange}
                      placeholder='Username'
                      onMouseOut={() => {
                        if (!formState.username) {
                          setError('* Username is required');
                          return;
                        }
                      }}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name='password'
                      type='password'
                      value={formState.password}
                      // controlid='password-login'
                      onChange={handleChange}
                      placeholder='Password'
                      onMouseOut={() => {
                        if (!formState.password) {
                          setError('* Password is required');
                          return;
                        }
                        if (!isValidPassword(formState.password)) {
                          setError(
                            '* Password does not meet length requirement'
                          );
                          return;
                        }
                      }}
                    />
                  </Form.Group>

                  <p>{error}</p>

                  <Button
                    variant='primary'
                    type='submit'
                    disabled={
                      !formState.email ||
                      !formState.password ||
                      !formState.username ||
                      formState.password.length < 8
                    }
                  >
                    Sign Up
                  </Button>
                </Form>

                <a
                  href='/'
                  data-bs-toggle='modal'
                  data-bs-target='#signup'
                  onClick={() => {
                    setToggleState(false);
                  }}
                >
                  Already have an account? Click here to Login!
                </a>
              </Modal.Body>
            </>
          ) : (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={loginFormHandler}>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name='email'
                      type='email'
                      value={formState.email}
                      // controlid='email-login'
                      onChange={handleChange}
                      placeholder='Enter email'
                      onMouseOut={() => {
                        if (!formState.email) {
                          setError('* Email is required');
                          return;
                        }
                        if (!isValidEmail(formState.email)) {
                          setError('* Please enter a valid Email');
                          return;
                        }
                      }}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name='password'
                      type='password'
                      value={formState.password}
                      // controlid='password-login'
                      onChange={handleChange}
                      placeholder='Password'
                      onMouseOut={() => {
                        if (!formState.password) {
                          setError('* Password is required');
                          return;
                        }
                        if (!isValidPassword(formState.password)) {
                          setError(
                            '* Password does not meet length requirement'
                          );
                          return;
                        }
                      }}
                    />
                  </Form.Group>

                  <p>{error}</p>

                  <Button

                    variant="primary"
                    type="submit"
                    disabled={
                      !formState.email ||
                      !formState.password ||
                      formState.password.length < 8
                    }

                  >
                    Log In
                  </Button>
                </Form>

                <a
                  href='/'
                  data-bs-toggle='modal'
                  data-bs-target='#signup'
                  onClick={() => {
                    setToggleState(true);
                  }}
                >
                  Need an account? Click here to sign up!
                </a>
              </Modal.Body>
            </>
          )}
        </Modal>
      )}
      {error && addError && (
        <div className='my-3 p-3 bg-danger text-white'>{error.message}</div>
      )}
    </div>
  );
};

export default Login;
