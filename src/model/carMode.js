import { connectionDb } from "../lib/conection.js";

export async function getCarById(carId) {
    const [rows] = await connectionDb.query(`
      SELECT
        c.id,
        m.name AS model_name,
        b.name AS brand_name,
        c.price,
        c.description,
        c.status,
        ci.image_url,
        m.color,
        m.fuelType,
        m.year,
        m.motor_liter,
        m.car_hp,
        m.accleration AS acceleration,
        m.max_spees AS max_speeds
      FROM cars c
      JOIN models m ON c.model_id = m.id
      JOIN brands b ON m.brand_id = b.id
      LEFT JOIN carImages ci ON ci.car_id = c.id
      WHERE c.id = ?
      LIMIT 1;
    `, [carId]);
  
    return rows[0];
  }
  