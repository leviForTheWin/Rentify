import Property from "../models/propertyModel.js";
import User from "../models/userModel.js";

export const addNewPropertyController = async (req, res) => {
  try {
    const propertyDetails = req.body;

    // Validate that all required fields are present
    const requiredFields = [
      "name", "price", "area", "address", "city", "state", "country", 
      "zip", "image", "numberOfBedrooms", "numberOfBathrooms", 
      "nearbyHospital", "nearbyCollege", "ownerId"
    ];
    for (const field of requiredFields) {
      if (!propertyDetails[field]) {
        return res.status(400).json({
          message: `Field ${field} is required`,
        });
      }
    }

    // Fetch owner details
    const owner = await User.findById(propertyDetails.ownerId);
    if (!owner) {
      return res.status(404).json({
        message: "Owner not found",
      });
    }

    // Create and save new property
    const property = new Property({
      ...propertyDetails,
      owner: propertyDetails.ownerId,
      ownerEmail: owner.email,
    });
    
    await property.save();
    res.status(201).json({
      message: "Property added successfully",
      property,
    });
  } catch (error) {
    console.error("Error adding new property:", error); 
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllOwnedPropertiesController = async (req, res) => {
  try {
    const userId = req.params.id;
    const properties = await Property.find({ owner: userId });
    // console.log(properties);
    res.status(200).json({
      success: true,
      message: "Properties fetched successfully",
      properties,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching properties",
      error,
    });
  }
};

export const getPropertyByIdController = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }
    res.status(200).json({
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updatePropertyController = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const propertyDetails = req.body;

    // Validate the property ID
    if (!propertyId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid property ID format",
      });
    }

    // Validate the property details
    const requiredFields = [
      'name', 'price', 'area', 'address', 'city', 'state', 'country', 'zip',
      'image', 'numberOfBedrooms', 'numberOfBathrooms', 'nearbyHospital', 'nearbyCollege'
    ];

    for (let field of requiredFields) {
      if (!propertyDetails[field]) {
        return res.status(400).json({
          message: `Missing required field: ${field}`,
        });
      }
    }

    // Find and update the property
    const property = await Property.findByIdAndUpdate(
      propertyId,
      { $set: propertyDetails },
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // console.log("Property updated:", property);
    res.status(200).json({
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};


export const deletePropertyController = async (req, res) => {
  try {
    const propertyId = req.params.id;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Check if the authenticated user is the owner of the property or an admin
    const owner = await User.findById(property.owner._id);
    // console.log("Owner found:", owner);
    if (!owner) {
      return res.status(404).json({
        message: "Owner not found",
      });
    }

    // Delete the property
    await Property.findByIdAndDelete(propertyId);

    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting property:", error); 
    res.status(500).json({
      message: "Internal server error",
      error: error.message,  
    });
  }
};
