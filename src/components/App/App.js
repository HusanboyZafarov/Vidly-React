import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Movies from "../Movies/Movies";
import Customers from "./../Customers/Customers";
import NotFound from "./../NotFound/NotFound";
import Rentals from "./../Rentals/Rentals";
import Navbar from "./../Navbar/Navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/movies" />} />
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
