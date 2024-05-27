import { useState, useEffect } from "react";
import PropertyCard from "../components/Layout/PropertyCard.jsx";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    const { data } = await axios.get(
      "https://rentify-1-yzdd.onrender.com/api/v1/buyer/properties",
    );
    setProperties(data.properties);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      <h1>Available Properties</h1>
      <div className="properties-container">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            className="property-card"
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
