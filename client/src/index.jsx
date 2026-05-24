import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Home } from "./Home";
import { CityList } from "./CityList";
import { DogDetails } from "./DogDetails";
import { AddDogForm } from "./AddDogForm";
import { WalkerList } from "./WalkerList.jsx";
import { WalkerForm } from "./WalkerForm.jsx";
import { EligibleDogs } from "./EligibleDogs.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="cities" element={<CityList />} />
        <Route path="dogs/add" element={<AddDogForm />} />
        <Route path="dogs/:id" element={<DogDetails />} />
        <Route path="walkers" element={<WalkerList />} />
        <Route path="walkers/:id/edit" element={<WalkerForm />} />
        <Route path="walkers/:id/dogs" element={<EligibleDogs />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
