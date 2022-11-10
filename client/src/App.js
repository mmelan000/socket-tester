import React from 'react';
// import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Forums from './pages/Forums';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import SingleThought from './pages/SingleThought';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import jwtDecode from 'jwt-decode';
import { setContext } from '@apollo/client/link/context';
import socketIO from 'socket.io-client';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://socket-io-server-for-array-game-production.up.railway.app/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

let origin = 'http://localhost:3002';

if (process.env.NODE_ENV === 'production') {
  origin = 'socket-io-server-for-array-game-production.up.railway.app';
  // socket-tester-production.up.railway.app
  // socket-tester-production.up.railway.app:5776
  // socket-io-server-for-array-game-production.up.railway.app:5776
}

console.log(process.env);

const socket = socketIO.connect(origin);
export default function App() {
  console.log('app.js');
  let room;
  let user;
  if (localStorage.getItem('id_token')) {
    user = jwtDecode(localStorage.getItem('id_token')).data.username;
  }
  if (
    window.location.pathname.slice(1, 6) === 'lobby' &&
    window.location.pathname.slice(7).length > 1
  ) {
    room = window.location.pathname.slice(7);
    socket.emit('joinRoom', { room, user });
  }

  socket.emit('newUser', user);
  window.onbeforeunload = function () {
    socket.emit('disconnect');
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='main-body'>
          <Navbar />
          <div className='main-display'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route
                path='/lobby/:id'
                element={<Lobby socket={socket} room={room} user={user} />}
              />
              <Route path='/forums' element={<Forums />} />
              <Route path='/thoughts/:thoughtId' element={<SingleThought />} />
            </Routes>
          </div>
          <Footer year={new Date().getFullYear()} />
        </div>
      </Router>
    </ApolloProvider>
  );
}
