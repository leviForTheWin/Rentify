import Property from "../models/propertyModel.js";

export const getAllPropertiesController = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const likePropertyController = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const propertyLikedCount = req.body.likedCount;

    // Validate the property ID
    if (!propertyId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid property ID format",
      });
    }

    // Find and update the property
    const property = await Property.findByIdAndUpdate(
      propertyId,
      {likedCount: propertyLikedCount }
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      message: "Property liked successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error
    });
  }
};
