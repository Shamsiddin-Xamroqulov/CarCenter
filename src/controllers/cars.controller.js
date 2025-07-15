import { createCarSchema } from "../utils/validation.js";
import { connectionDb } from "../lib/conection.js";

class CarsController {
  static async getAllCars(req, res) {
    try {
      const [cars] = await connectionDb.query(`
            SELECT c.id AS car_id, c.count, c.price, c.status, c.description,
                   m.name AS model_name, m.color, m.accleration, m.max_spees, m.fuelType,
                   m.transmission, m.year, m.car_hp, m.motor_liter,
                   b.name AS brand_name
            FROM cars c
            JOIN models m ON c.model_id = m.id
            JOIN brands b ON m.brand_id = b.id
          `);

      res.json(cars);
    } catch (err) {
      console.error("Get all cars error:", err);
      res.status(500).json({ message: "Server error while fetching cars" });
    }
  }
  static async getCarById(req, res) {
    try {
      const { id } = req.params;
      const [cars] = await connectionDb.query(
        `
        SELECT c.id AS car_id, c.count, c.price, c.status, c.description,
               m.name AS model_name, m.color, m.accleration, m.max_spees, m.fuelType,
               m.transmission, m.year, m.car_hp, m.motor_liter,
               b.name AS brand_name
        FROM cars c
        JOIN models m ON c.model_id = m.id
        JOIN brands b ON m.brand_id = b.id
        WHERE c.id = ?
      `,
        [id]
      );

      if (cars.length === 0) {
        return res.status(404).json({ message: "Car not found" });
      }

      res.json(cars[0]);
    } catch (err) {
      console.error("Get car by ID error:", err);
      res.status(500).json({ message: "Server error while fetching car" });
    }
  }

  static async createCar(req, res) {
    try {
      if (!req.user || req.user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "The user is not an admin, you cannot add a car." });
      }

      const { error, value } = createCarSchema.validate(req.body, {
        abortEarly: true,
      });
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ message: "Validation errors", errors });
      }

      const {
        brand_id,
        model_name,
        color,
        acceleration,
        max_speeds,
        fuelType,
        transmission,
        year,
        car_hp,
        motor_liter,
        count,
        price,
        description,
        status,
      } = value;

      const [modelResult] = await connectionDb.query(
        `
        INSERT INTO models 
          (brand_id, name, color, accleration, max_spees, fuelType, transmission, year, car_hp, motor_liter)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          brand_id,
          model_name,
          color,
          acceleration,
          max_speeds,
          fuelType,
          transmission,
          year,
          car_hp,
          motor_liter,
        ]
      );

      const modelId = modelResult.insertId;

      const [carResult] = await connectionDb.query(
        `
        INSERT INTO cars 
          (model_id, count, price, description, status)
        VALUES (?, ?, ?, ?, ?)
      `,
        [modelId, count, price, description, status || "available"]
      );

      const carId = carResult.insertId;

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          await connectionDb.query(
            `
            INSERT INTO carImages (image_url, car_id)
            VALUES (?, ?)
          `,
            [file.path, carId]
          );
        }
      }

      res.status(201).json({
        message: "Car successfully created",
        carId,
        images: req.files?.map((file) => file.path) || [],
      });
    } catch (err) {
      console.error("Create car error:", err);
      res.status(500).json({ message: "Server error while creating car" });
    }
  }

  static async updateCar(req, res) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can update cars' });
      }
  
      const { id } = req.params;
      const { count, price, description, status } = req.body;
  
      const [result] = await connectionDb.query(`
        UPDATE cars SET count = ?, price = ?, description = ?, status = ? WHERE id = ?
      `, [count, price, description, status, id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Car not found or no changes made' });
      }
  
      res.json({ message: 'Car updated successfully' });
    } catch (err) {
      console.error('Update car error:', err);
      res.status(500).json({ message: 'Server error while updating car' });
    }
  }
  
 
   static async deleteCar(req, res) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can delete cars' });
      }
  
      const { id } = req.params;
  
      const [result] = await connectionDb.query(`DELETE FROM cars WHERE id = ?`, [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      res.json({ message: 'Car deleted successfully' });
    } catch (err) {
      console.error('Delete car error:', err);
      res.status(500).json({ message: 'Server error while deleting car' });
    }
  }
}

export default CarsController;
