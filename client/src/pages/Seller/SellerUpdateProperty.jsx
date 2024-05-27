import { useState, useEffect } from "react";
import SellerMenu from "../../components/Layout/SellerMenu.jsx";
import { useAuth } from "../../context/auth.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SellerUpdateProperty = () => {
  const propertyId  = useParams().id;
  const [auth] = useAuth();
  const navigate = useNavigate();
  const isBuyer = auth?.user?.buyer;

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/seller/property/${propertyId}`
      );
      setFormData(response.data.property);
    } catch (error) {
      console.log("Error fetching property:", error);
    }
  };

  useEffect(() => {
    if (isBuyer) navigate("/dashboard/seller");
    if (!auth?.token) navigate("/login");
  }, [auth?.token, isBuyer]);

  useEffect(() => {
    fetchProperty();
  }, [auth?.token], propertyId);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    area: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    image: "",
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    nearbyHospital: "",
    nearbyCollege: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/seller/property/${propertyId}`,
        { ...formData, ownerId: auth.user._id },
        {
          headers: { Authorization: auth.token },
        }
      );
      alert("Property updated successfully", response.data.message);
      navigate("/dashboard/seller");
    } catch (error) {
      alert("Error updating property: " + error);
    }
  };

  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3 adminPanel">
          <SellerMenu />
        </div>
        <div className="col-md-9">
          <h2>Update Property</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Area</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Zip</label>
              <input
                type="number"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Number of Bedrooms</label>
              <input
                type="number"
                name="numberOfBedrooms"
                value={formData.numberOfBedrooms}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Number of Bathrooms</label>
              <input
                type="number"
                name="numberOfBathrooms"
                value={formData.numberOfBathrooms}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Nearby Hospital</label>
              <input
                type="text"
                name="nearbyHospital"
                value={formData.nearbyHospital}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Nearby College</label>
              <input
                type="text"
                name="nearbyCollege"
                value={formData.nearbyCollege}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Update Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerUpdateProperty;