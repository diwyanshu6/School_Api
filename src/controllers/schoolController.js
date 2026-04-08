// src/controllers/schoolController.js
const db = require("../config/db");
const Joi = require("joi");
const { calculateDistance } = require("../utils/distance");

// Validation schema
const schoolSchema = Joi.object({
  name: Joi.string().min(2).required(),
  address: Joi.string().min(3).required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

// Add School
exports.addSchool = async (req, res, next) => {
  try {
    const { error } = schoolSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, address, latitude, longitude } = req.body;

    const [result] = await db.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    res.status(201).json({
      message: "School added successfully",
      id: result.insertId,
    });
  } catch (err) {
    next(err);
  }
};

// List Schools

exports.listSchools = async (req, res, next) => {
  try {
    const schema = Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    });

    const { error, value } = schema.validate(req.query);

    if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((d) => d.message),
      });
    }

    const userLat = value.latitude;
    const userLon = value.longitude;

    const [schools] = await db.query("SELECT * FROM schools");

    const sorted = schools.map((school) => ({
      ...school,
      distance: calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      ),
    }));

    sorted.sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (err) {
    next(err);
  }
};