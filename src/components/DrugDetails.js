// components/DrugDetails.js
import React, { useState, useEffect } from 'react';
import { default as RxNormAPI } from '../api/RxNormAPI';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import '../App.css';

const DrugDetails = () => {
  const { drugName } = useParams();
  const [drug, setDrug] = useState({});
  const [ndcs, setNDCs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const rxNormApi = new RxNormAPI();

  useEffect(() => {
    const fetchDrugDetails = async () => {
      setLoading(true);
      try {
        const response = await rxNormApi.getDrugs(drugName);
        const drugData = response.data[0];
        setDrug(drugData);
        const ndcResponse = await rxNormApi.getNDCs(drugData.rxcui);
        setNDCs(ndcResponse.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDrugDetails();
  }, [drugName]);

  return (
    <div className="drug-details-container">
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status" className="spinner-border">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div>
        <img src='../assets/xogene.jpeg' alt="Logo" className="logo" />
          <div className="drug-details-header">
            <h1>{drug.name}</h1>
            <p>RXCUI: {drug.rxcui}</p>
            <p>Synonym: {drug.synonym}</p>
          </div>
          <h2>NDCs:</h2>
          <ul className="ndc-list">
            {ndcs.map((ndc) => (
              <li key={ndc}>{ndc}</li>
            ))}
          </ul>
          <div className="additional-info">
            <h2>Additional Information:</h2>
            <p>Brand Name: {drug.brandName}</p>
            <p>Generic Name: {drug.genericName}</p>
            <p>Route: {drug.route}</p>
            <p>Dosage Form: {drug.dosageForm}</p>
            <p>Strength: {drug.strength}</p>
          </div>
          {error && <p className="error-message">Error: {error}</p>}
        </div>
      )}
    </div>
  );
};

export default DrugDetails;