import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


//componentes creados
import Categorias from "./components/categorias";
import Productos from "./components/productos";
import NavbarExample from "./layouts/navbar";
import Home from "./components/home";

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <NavbarExample /> }>

          <Route index element={ <Home /> } />

            <Route path="categorias" element={ <Categorias /> } />

            <Route path="productos" element={ <Productos /> } />

            <Route path="*" element={ <Navigate replace to="/" /> } />

          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
