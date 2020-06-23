import React from 'react';
import './App.css';
import path from 'path';

//JSX: sintaxe de cml dentro do JS
import Routes from './Routes';
import CreatePoint from './pages/CreatePoint';
import Home from './pages/Home';
import { Router } from 'react-router-dom';


function App() {
  return (
     <Routes/>
  );
}

export default App;
