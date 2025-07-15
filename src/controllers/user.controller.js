import { userSchema } from "../validation.js";
import hashService from "../lib/hashed.js";
import { fetch } from "../lib/conection.js";
import { globalError } from "shokhijakhon-error-handler";

class UserController {
  async create(req, res) {
    try {
      const { error, value } = userSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map(err => err.message);
        return res.status(400).json({ errors: messages });
      }

      const {
        first_name, last_name, email, password, phone,
        region, city, street, description
      } = value;

      const existing = await fetch("SELECT * FROM users WHERE email = ?", false, email);
      if (existing.length) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const hashed = await hashService.hash(password);
      const result = await fetch(
        `INSERT INTO users (first_name, last_name, email, password, phone)
         VALUES (?, ?, ?, ?, ?)`,
        false,
        first_name, last_name, email, hashed, phone
      );

      await fetch(
        `INSERT INTO addresses (user_id, region, city, street, description)
         VALUES (?, ?, ?, ?, ?)`,
        false,
        result.insertId, region, city, street, description
      );

      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      globalError(err, res);
    }
  }

  async getAll(req, res) {
    try {
      const users = await fetch(
        `SELECT u.*, a.region, a.city, a.street, a.description
         FROM users u
         JOIN addresses a ON u.id = a.user_id`
      );
      res.json(users);
    } catch (err) {
      globalError(err, res);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const user = await fetch(
        `SELECT u.*, a.region, a.city, a.street, a.description
         FROM users u
         JOIN addresses a ON u.id = a.user_id
         WHERE u.id = ?`,
        false,
        id
      );
      if (!user.length) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user[0]);
    } catch (err) {
      globalError(err, res);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = userSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map(err => err.message);
        return res.status(400).json({ errors: messages });
      }

      const {
        first_name, last_name, email, password, phone,
        region, city, street, description
      } = value;

      const hashed = await hashService.hash(password);

      await fetch(
        `UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, phone = ? WHERE id = ?`,
        false,
        first_name, last_name, email, hashed, phone, id
      );

      await fetch(
        `UPDATE addresses SET region = ?, city = ?, street = ?, description = ? WHERE user_id = ?`,
        false,
        region, city, street, description, id
      );

      res.json({ message: "User updated successfully" });
    } catch (err) {
      globalError(err, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      await fetch(`DELETE FROM addresses WHERE user_id = ?`, false, id);
      await fetch(`DELETE FROM users WHERE id = ?`, false, id);

      res.json({ message: "User deleted successfully" });
    } catch (err) {
      globalError(err, res);
    }
  }
}

export default new UserController();
