import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Movies from "../Movies/Movies";
import Customers from "./../Customers/Customers";
import NotFound from "./../NotFound/NotFound";
import Rentals from "./../Rentals/Rentals";
import Navbar from "./../Navbar/Navbar";
import MovieForm from "./../MovieForm/MovieForm";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm"

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/movies/:id" element={<MovieForm />} />
            <Route path="/movies/new" element={<MovieForm />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
