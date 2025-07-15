import { connectionDb } from "../lib/conection.js";
import { carsCreditValidation } from "../utils/validation.js";

class CarsCreditController {
  async createCredit(req, res) {
    try {
      const { error, value } = carsCreditValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const {
        user_id, car_id, total_price, down_payment,
        monthly_payment, month_count, interest_rate,
        start_date, end_date, status
      } = value;

      const [result] = await connectionDb.query(
        `INSERT INTO car_credits 
         (user_id, car_id, total_price, down_payment, monthly_payment, month_count, interest_rate, start_date, end_date, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, car_id, total_price, down_payment, monthly_payment, month_count, interest_rate, start_date, end_date, status]
      );

      res.status(201).json({ message: "Credit successfully created", credit_id: result.insertId });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async getAllCredits(req, res) {
    try {
      const [credits] = await connectionDb.query(`SELECT * FROM car_credits`);
      res.status(200).json(credits);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async getCreditById(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await connectionDb.query(`SELECT * FROM car_credits WHERE id = ?`, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: "Credit not found" });
      }

      res.status(200).json(rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async updateCredit(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = carsCreditValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const {
        user_id, car_id, total_price, down_payment,
        monthly_payment, month_count, interest_rate,
        start_date, end_date, status
      } = value;

      const [result] = await connectionDb.query(
        `UPDATE car_credits SET 
          user_id = ?, car_id = ?, total_price = ?, down_payment = ?, monthly_payment = ?, 
          month_count = ?, interest_rate = ?, start_date = ?, end_date = ?, status = ?
         WHERE id = ?`,
        [user_id,
        car_id,
        total_price,
        down_payment,
        monthly_payment, 
        month_count, 
        interest_rate,
        start_date, 
        end_date, 
        status, 
        id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Credit not found or not updated" });
      }

      res.status(200).json({ message: "Credit successfully updated" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async deleteCredit(req, res) {
    try {
      const { id } = req.params;

      const [result] = await connectionDb.query(`DELETE FROM car_credits WHERE id = ?`, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Credit not found or already deleted" });
      }

      res.status(200).json({ message: "Credit successfully deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
}

export default new CarsCreditController();
