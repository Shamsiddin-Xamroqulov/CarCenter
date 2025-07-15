import { registerSchema } from "../utils/validation.js";
import hashService from "../lib/hashed.js";
import authService from "../lib/jwt.js";
import { fetch } from "../lib/conection.js";
import { connectionDb } from "../lib/conection.js";
import { ClientError, globalError } from "shokhijakhon-error-handler";


class AuthController {
  async register(req, res) {
    try {
      const { file } = req;
      if (!req.file) {
        return res.status(400).json({ message: "Avatar is required !" });
      }
  
      const { error, value } = registerSchema.validate(
        { ...req.body, avatar: file },
        { abortEarly: true }
      );
  
      if (error) {
        const messages = error.details.map((err) => err.message);
        return res.status(400).json({ errors: messages });
      }
  
      const {
        first_name,
        last_name,
        email,
        password,
        phone,
        region,
        city,
        street,
        description,
      } = value;

      const [admin] = await connectionDb.query(`SELECT * FROM admins WHERE email=?`, [email])
      if(admin.length > 0) throw new ClientError("This email adlready exists in Admins")
  
      const existingUser = await fetch(
        "SELECT * FROM users WHERE email = ?",
        false,
        email
      );
      if (existingUser.length > 0) {
        return res
          .status(400)
          .json({ message: "Email already exists" });
      }
  
      const hashedPassword = await hashService.hash(password);

      
      const avatar_url = file?.path;
      
      const userResult = await fetch(
        `INSERT INTO users (first_name, last_name, email, password, phone, avatar) VALUES (?, ?, ?, ?, ?, ?)`,
        false,
        first_name,
        last_name,
        email,
        hashedPassword,
        phone,
        avatar_url
      );
  
      const user_id = userResult.insertId;
  
      await fetch(
        `INSERT INTO addresses (user_id, region, city, street, description) VALUES (?, ?, ?, ?, ?)`,
        false,
        user_id,
        region,
        city,
        street,
        description
      );
  
      const token = authService.generateToken({
        userId: user_id,
        email,
        role: "user"
      });

      let roleToken = authService.verifyToken(token);
        
      return res.status(201).json({
        message: "User succesfuly created !",
        token: token,
        user: {
          first_name,
          last_name,
          email,
          password,
          phone,
          region,
          city,
          street,
          description,
          avatar: avatar_url,
          role: roleToken.role,
        }
      });
    } catch (err) {
      globalError(err, res);
    }
  }
  

  async login(req, res) {
    const { email, password } = req.body;
  
    try {
      const [admins] = await connectionDb.query(
        "SELECT * FROM admins WHERE email = ?",
        [email]
      );
  
      if (admins.length > 0) {
        const admin = admins[0];
        const token = authService.generateToken({
          id: admin.id,
          email: admin.email,
          role: admin.role || "admin",
        });
  
        return res.json({ message: "Successfully logged in!", token });
      }

      const [users] = await connectionDb.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
  
      if (users.length > 0) {
        const user = users[0];
        const token = authService.generateToken({
          id: user.id,
          email: user.email,
          role: "user",
        });
  
        return res.json({ message: "Successfully logged in!", token });
      }
  
      return res.status(401).json({ message: "Invalid email or password." });
    } catch (err) {
      globalError(err, res);
    }
  }
  
}

export default new AuthController();
