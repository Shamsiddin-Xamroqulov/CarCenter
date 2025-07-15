import { ClientError, globalError } from "shokhijakhon-error-handler";
import { connectionDb } from "../lib/conection.js"; 
import { adminValidation } from "../utils/validation.js"; 
import hashService from "../lib/hashed.js";

class AdminController {
  async createAdmin(req, res) {
    try {
      if(!req.user || req.user.role !== "super_admin") throw new ClientError("Only Super admin can create", 404);
      const { error, value } = adminValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const { first_name, last_name, email, password, phone } = value;

      const [existing] = await connectionDb.query(`SELECT * FROM admins WHERE email = ?`, [email]);
      if (existing.length > 0) {
        return res.status(409).json({ message: "Admin with this email already exists" });
      }

      const [user] = await connectionDb.query(`SELECT * FROM users WHERE email=?`, [email])
      if(user.length > 0) throw new ClientError("This email already exists in users", 404);

      const hashedPassword = await hashService.hash(password);

      const [result] = await connectionDb.query(
        `INSERT INTO admins (first_name, last_name, email, password, phone) VALUES (?, ?, ?, ?, ?)`,
        [first_name, last_name, email, hashedPassword, phone]
      );

      res.status(201).json({ message: "Admin created successfully", admin_id: result.insertId });
    } catch (err) {
      globalError(err, res);
    }
  }

  async getAllAdmins(req, res) {
    try {
      const [rows] = await connectionDb.query(`SELECT * FROM admins`);
      res.status(200).json(rows);
    } catch (err) {
      globalError(err, res);
    }
  }

  async getAdminById(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await connectionDb.query(`SELECT * FROM admins WHERE id = ?`, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.status(200).json(rows[0]);
    } catch (err) {
      globalError(err, res);
    }
  }

  async updateAdmin(req, res) {
    try {
      const { id } = req.params;

      if (!req.user || req.user.role !== 'admin' || req.user.id != id) {
        return res.status(403).json({ message: "You are only allowed to update your own profile." });
      }
  
      const { error, value } = adminValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });
  
      const { fName, lName, email, password, phone } = value;
  
      const [result] = await connectionDb.query(
        `UPDATE admins SET fName = ?, lName = ?, email = ?, password = ?, phone = ? WHERE id = ?`,
        [fName, lName, email, password, phone, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Admin not found or update failed." });
      }
  
      res.status(200).json({ message: "Admin updated successfully." });
    } catch (err) {
      globalError(err, res);
    }
  }
  

  async deleteAdmin(req, res) {
    try {
      const { id } = req.params;
      if (!req.user || req.user.role !== 'admin' || req.user.id != id) {
        return res.status(403).json({ message: "You are only allowed to delete your own account." });
      }
  
      const [result] = await connectionDb.query(`DELETE FROM admins WHERE id = ?`, [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Admin not found or already deleted." });
      }
  
      res.status(200).json({ message: "Admin deleted successfully." });
    } catch (err) {
      globalError(err, res);
    }
  }  
}

export default new AdminController();
