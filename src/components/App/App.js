import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "../Movies/Movies";
import Customers from "./../Customers/Customers";
import NotFound from "./../NotFound/NotFound";
import Rentals from "./../Rentals/Rentals";
import Navbar from "./../Navbar/Navbar";
import MovieForm from "./../MovieForm/MovieForm";
import LoginForm from "../LoginForm/LoginForm";
import Logout from "./../Logout/Logout";
import ProtectedRoute from "../common/ProtectedRoute";

import auth from "../../services/authService";
import RegisterForm from "../RegisterForm/RegisterForm";

import "react-toastify/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/movies/:id"
              element={
                <ProtectedRoute>
                  <MovieForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies/new"
              element={
                <ProtectedRoute>
                  <MovieForm />
                </ProtectedRoute>
              }
            />
            <Route path="/movies" element={<Movies user={this.state.user} />} />
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
