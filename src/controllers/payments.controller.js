import { connectionDb } from "../lib/conection.js"; 
import { paymentValidation } from "../utils/validation.js"; 

class PaymentController {
  async createPayment(req, res) {
    try {
      const { error, value } = paymentValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const { car_credit_id, due_date, amount, paid_amount, status } = value;

      const [result] = await connectionDb.query(
        `INSERT INTO credit_payments (car_credit_id, due_date, amount, paid_amount, status)
         VALUES (?, ?, ?, ?, ?)`,
        [car_credit_id, due_date, amount, paid_amount, status]
      );

      res.status(201).json({ message: "Payment created successfully", payment_id: result.insertId });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async getAllPayments(req, res) {
    try {
      const [rows] = await connectionDb.query(`SELECT * FROM credit_payments`);
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async getPaymentById(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await connectionDb.query(`SELECT * FROM credit_payments WHERE id = ?`, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: "Payment not found" });
      }

      res.status(200).json(rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async updatePayment(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = paymentValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const { car_credit_id, due_date, amount, paid_amount, status } = value;

      const [result] = await connectionDb.query(
        `UPDATE credit_payments SET car_credit_id = ?, due_date = ?, amount = ?, paid_amount = ?, status = ?
         WHERE id = ?`,
        [car_credit_id, due_date, amount, paid_amount, status, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Payment not found or not updated" });
      }

      res.status(200).json({ message: "Payment updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async deletePayment(req, res) {
    try {
      const { id } = req.params;

      const [result] = await connectionDb.query(`DELETE FROM credit_payments WHERE id = ?`, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Payment not found or already deleted" });
      }

      res.status(200).json({ message: "Payment deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
}


export default new PaymentController();