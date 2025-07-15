import { globalError } from "shokhijakhon-error-handler";
import { connectionDb } from "../lib/conection.js";
import { getCarById } from "../model/carMode.js";

class ViewsController {
  async Main(req, res) {
    try {
      res.render("index");
    } catch (err) {
      globalError(err, res);
    }
  }
  async Clients(req, res) {
    try {
      const [users] = await connectionDb.query(`
        SELECT 
          u.id,
          u.first_name,
          u.last_name,
          u.email,
          u.password,
          u.phone,
          u.avatar,
          u.status,
          u.created_at,
          a.region,
          a.city,
          a.street,
          a.description
        FROM users u
        LEFT JOIN addresses a ON u.id = a.user_id
      `);
      res.render("clients", { usersData: users });
    } catch (err) {
      globalError(err, res);
    }
  }
  async Cars(req, res) {
    try {
      const [brands] = await connectionDb.query(
        "SELECT * FROM brands ORDER BY id ASC"
      );
      const [cars] = await connectionDb.query(`
        SELECT 
          c.id AS car_id,
          b.id AS brand_id,
          m.name AS model_name,
          m.color,
          m.accleration AS acceleration,
          m.max_spees AS max_speeds,
          m.fuelType,
          m.transmission,
          m.year,
          m.car_hp,
          m.motor_liter,
          c.count,
          c.price,
          c.description,
          c.status,
          (SELECT image_url FROM carImages WHERE car_id = c.id LIMIT 1) AS image_url
        FROM cars c
        JOIN models m ON c.model_id = m.id
        JOIN brands b ON m.brand_id = b.id
      `);

      res.render("car", { brandData: brands, car: cars });
    } catch (err) {
      globalError(err, res);
    }
  }
  async Register(req, res) {
    try {
      res.render("register");
    } catch (err) {
      globalError(err, res);
    }
  }
  async Login(req, res) {
    try {
      res.render("login");
    } catch (err) {
      globalError(err, res);
    }
  }
  async Orders(req, res) {
    try {
      res.render("orders");
    } catch (err) {
      globalError(err, res);
    }
  }
  async Profile(req, res) {
    try {
      res.render("profile");
    } catch (err) {
      globalError(err, res);
    }
  }
  async Admins(req, res) {
    try {
      const [admins] = await connectionDb.query(`SELECT * FROM admins`);
      res.render("admins", {admins});
    } catch (err) {
      globalError(err, res);
    }
  }
  async Details(req, res) {
    try {
      const carId = req.params.id;  // endi params dan olamiz
      if (!carId) return res.status(400).send("Car ID is required");
  
      const [carDetails] = await connectionDb.query(
        `
        SELECT 
          c.id AS car_id,
          b.name AS brand_name,
          m.name AS model_name,
          m.color,
          m.accleration AS acceleration,
          m.max_spees AS max_speeds,
          m.fuelType,
          m.transmission,
          m.year,
          m.car_hp,
          m.motor_liter,
          c.count,
          c.price,
          c.description,
          c.status,
          (SELECT image_url FROM carImages WHERE car_id = c.id LIMIT 1) AS image_url
        FROM cars c
        JOIN models m ON c.model_id = m.id
        JOIN brands b ON m.brand_id = b.id
        WHERE c.id = ?
        ORDER BY c.id ASC
        `,
        [carId]
      );
      
      if (!carDetails.length) return res.status(404).render("not-found");
      res.render("details", { car: carDetails[0] });
    } catch (err) {
      globalError(err, res);
    }
  }  
  async ClientDetails(req, res) {
    try {
      const clientId = req.params.id;

      const [[user]] = await connectionDb.query(
        `SELECT * FROM users WHERE id = ?`,
        [clientId]
      );

      if (!user) return res.status(404).render("404");

      const [[address]] = await connectionDb.query(
        `SELECT * FROM addresses WHERE user_id = ?`,
        [clientId]
      );

      const [credits] = await connectionDb.query(
        `SELECT * FROM car_credits WHERE user_id = ?`,
        [clientId]
      );

      const hasCredit = credits.length > 0;

      res.render("clientsDetail", {
        user,
        address,
        credits,
        hasCredit,
      });
    } catch (err) {
      globalError(err, res);
    }
  }
  async ClientIndex(req, res) {
    try { 
      const [brands] = await connectionDb.query(
        "SELECT * FROM brands ORDER BY id ASC"
      );
      const [cars] = await connectionDb.query(`
        SELECT 
          c.id AS car_id,
          b.id AS brand_id,
          m.name AS model_name,
          m.color,
          m.accleration AS acceleration,
          m.max_spees AS max_speeds,
          m.fuelType,
          m.transmission,
          m.year,
          m.car_hp,
          m.motor_liter,
          c.count,
          c.price,
          c.description,
          c.status,
          (SELECT image_url FROM carImages WHERE car_id = c.id LIMIT 1) AS image_url
        FROM cars c
        JOIN models m ON c.model_id = m.id
        JOIN brands b ON m.brand_id = b.id
      `);
      res.render("clientIndex", {car: cars, brandData: brands});
    }catch(err) {
      globalError(err, res);
    }
  }
  async ClientCarDetails(req, res) {
    try {
      const carId = req.params.id;
      const [carDetails] = await connectionDb.query(
        `SELECT
          c.id AS car_id,
          b.name AS brand_name,
          m.name AS model_name,
          m.color,
          m.accleration AS acceleration,
          m.max_spees AS max_speeds,
          m.fuelType,
          m.transmission,
          m.year,
          m.car_hp,
          m.motor_liter,
          c.count,
          c.price,
          c.description,
          c.status,
          (SELECT image_url FROM carImages WHERE car_id = c.id LIMIT 1) AS image_url
        FROM cars c
        JOIN models m ON c.model_id = m.id
        JOIN brands b ON m.brand_id = b.id
        WHERE c.id = ?
        ORDER BY c.id ASC`,
        [carId]
      );
  
      if (!carDetails.length) return res.status(404).render('not-found');
      res.render('clientCarDetails', { car: carDetails[0] });
    } catch (err) {
      globalError(err, res);
    }
  }
  
  async ClientCredits(req, res) {
    try {
      const { id } = req.params;
      const car = await getCarById(id);
      if (!car) return res.status(404).render('not-found');
  
      res.render("clientCredits", { car, user: req.user });
    } catch (err) {
      globalError(err, res);
    }
  }
  
}

export default new ViewsController();
