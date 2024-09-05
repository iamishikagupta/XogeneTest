// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrugSearch from './components/DrugSearch';
import DrugDetails from './components/DrugDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<DrugSearch />} />
        <Route path="/drugs/:drugName" element={<DrugDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;