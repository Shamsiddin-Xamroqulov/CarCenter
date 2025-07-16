-- Active: 1749538413427@@127.0.0.1@3306@car_center
CREATE DATABASE IF NOT EXISTS car_center;

USE car_center;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    avatar TEXT NOT NULL,
    status ENUM('active', 'inactive', 'banned') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    region VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    status ENUM("active", "inActive") DEFAULT "active",
    role ENUM("admin", "super_admin") DEFAULT "admin", 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE models (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL,
    accleration VARCHAR(255) NOT NULL,
    max_spees VARCHAR(255) NOT NULL,
    fuelType VARCHAR(50) NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    year YEAR NOT NULL,
    car_hp VARCHAR(255) NOT NULL,
    motor_liter VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);

CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model_id INT NOT NULL,
    count INT NOT NULL,
    price DOUBLE NOT NULL,
    description TEXT NOT NULL,
    status ENUM('available', 'sold', 'rented') NOT NULL DEFAULT 'available',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (model_id) REFERENCES models(id)
);

CREATE TABLE carImages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url TEXT NOT NULL,
    car_id INT NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

CREATE TABLE car_credits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    car_id INT NOT NULL,
    total_price DOUBLE NOT NULL,
    down_payment DOUBLE NOT NULL,
    monthly_payment DOUBLE NOT NULL,
    month_count INT NOT NULL,
    interest_rate DOUBLE NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status ENUM('active', 'paid', 'cancelled', 'overdue') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (car_id) REFERENCES cars(id)
);

CREATE TABLE credit_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_credit_id INT NOT NULL,
    due_date DATE NOT NULL,
    amount DOUBLE NOT NULL,
    paid_amount DOUBLE NOT NULL DEFAULT 0,
    status ENUM('pending', 'paid', 'late') NOT NULL DEFAULT 'pending',
    paid_at TIMESTAMP NULL,
    FOREIGN KEY (car_credit_id) REFERENCES car_credits(id) ON DELETE CASCADE
);

CREATE TABLE passed_credits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_credit_id INT NOT NULL UNIQUE,
    passed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_credit_id) REFERENCES car_credits(id) ON DELETE CASCADE
);

INSERT INTO brands (name) VALUES
('Tesla'),
('Porsche'),
('BMW'),
('Mercedes-Benz'),
('Audi'),
('Lucid'),
('Rivian'),
('Polestar');


INSERT INTO models (brand_id, name, color, accleration, max_spees, fuelType, transmission, year, car_hp, motor_liter) VALUES
(1, 'Model S Plaid', 'White', '0-100 km/s: 2.1s', '322 km/soat', 'Elektromobil', 'Automatic', 2024, '1,020 ot kuchi', 'N/A'),
(2, 'Taycan Turbo S', 'Grey', '0-100 km/s: 2.8s', '260 km/soat', 'Elektromobil', 'Automatic', 2024, '750 ot kuchi', 'N/A'),
(3, 'iX M60', 'Black', '0-100 km/s: 3.8s', '250 km/soat', 'Elektromobil', 'Automatic', 2024, '610 ot kuchi', 'N/A'),
(4, 'EQS 580', 'Silver', '0-100 km/s: 4.1s', '210 km/soat', 'Elektromobil', 'Automatic', 2024, '516 ot kuchi', 'N/A'),
(5, 'e-tron GT RS', 'Dark Grey', '0-100 km/s: 3.3s', '250 km/soat', 'Elektromobil', 'Automatic', 2024, '637 ot kuchi', 'N/A'),
(6, 'Air Dream Edition', 'White', '0-100 km/s: 2.5s', '270 km/soat', 'Elektromobil', 'Automatic', 2024, '1,111 ot kuchi', 'N/A'),
(7, 'R1S', 'Green', '0-100 km/s: 3.0s', '200 km/soat', 'Elektromobil', 'Automatic', 2024, '835 ot kuchi', 'N/A'),
(8, 'Polestar 3', 'Gold', '0-100 km/s: 4.6s', '210 km/soat', 'Elektromobil', 'Automatic', 2024, '517 ot kuchi', 'N/A'),
(1, 'Model 3', 'Red', '0-100 km/s: 4.2s', '233 km/soat', 'Elektromobil', 'Automatic', 2023, '498 ot kuchi', 'N/A'),
(1, 'Model X', 'Blue', '0-100 km/s: 3.8s', '250 km/soat', 'Elektromobil', 'Automatic', 2024, '670 ot kuchi', 'N/A'),
(2, '911 Carrera', 'Yellow', '0-100 km/s: 4.0s', '293 km/soat', 'Benzin', 'Automatic', 2023, '385 ot kuchi', '3.0L'),
(3, 'M3 Sedan', 'Black', '0-100 km/s: 4.1s', '250 km/soat', 'Benzin', 'Manual', 2024, '473 ot kuchi', '3.0L'),
(4, 'C-Class Sedan', 'White', '0-100 km/s: 6.0s', '240 km/soat', 'Benzin', 'Automatic', 2023, '255 ot kuchi', '2.0L'),
(5, 'A6 Sedan', 'Silver', '0-100 km/s: 5.1s', '250 km/soat', 'Benzin', 'Automatic', 2024, '335 ot kuchi', '3.0L');


INSERT INTO cars (model_id, count, price, description, status) VALUES
(1, 5, 129990.00, 'Tesla Model S Plaid - Eng yuqori unumdorlik va tezlik. Uchta dvigatelli AWD.', 'available'),
(2, 3, 187600.00, 'Porsche Taycan Turbo S - Sport avtomobillarining elektr kelajagi. Ajoyib boshqaruv.', 'available'),
(3, 4, 108900.00, 'BMW iX M60 - Hashamatli va kuchli elektr SUV. Komfort va texnologiya uyg`unligi.', 'available'),
(4, 2, 104400.00, 'Mercedes-Benz EQS 580 - Mercedes-Benzning elektr flagmani. Ultra-hashamatli interyer.', 'available'),
(5, 3, 140000.00, 'Audi e-tron GT RS - Dinamik dizayn va elektr quvvati. Sport sedanlarining yangi avlodi.', 'available'),
(6, 1, 169000.00, 'Lucid Air Dream Edition - Rekord tezlik va uzoq masofali elektr avtomobil. Yangi darajadagi hashamat.', 'available'),
(7, 2, 79000.00, 'Rivian R1S - Sarguzasht uchun mo`ljallangan elektr SUV. Yuqori o`tkazuvchanlik qobiliyati.', 'available'),
(8, 4, 75000.00, 'Polestar 3 - Zamonaviy va xavfsiz elektr SUV. Minimalistik dizayn va ilg`or texnologiyalar.', 'available'),
(9, 6, 45000.00, 'Tesla Model 3 - Mashhur elektr sedan, ajoyib ishlash va yuqori samaradorlik.', 'available'),
(10, 3, 99990.00, 'Tesla Model X - Elektr SUV, gulli eshiklar va keng interyerga ega.', 'available'),
(11, 2, 114000.00, 'Porsche 911 Carrera - Sport avtomobillari afsonasi, klassik dizayn va ajoyib ishlash.', 'available'),
(12, 1, 74900.00, 'BMW M3 Sedan - Sport sedanlar orasida etakchi, dinamik boshqaruv va kuchli dvigatel.', 'available'),
(13, 5, 48000.00, 'Mercedes-Benz C-Class Sedan - Hashamatli va qulay sedan, kundalik foydalanish uchun ideal.', 'available'),
(14, 4, 59000.00, 'Audi A6 Sedan - Elegant dizayn va ilg`or texnologiyalarga ega biznes-klass sedan.', 'available');


INSERT INTO carImages (image_url, car_id) VALUES
('https://example.com/tesla_s_plaid_1.jpg', 1),
('https://example.com/tesla_s_plaid_2.jpg', 1),
('https://example.com/porsche_taycan_1.jpg', 2),
('https://example.com/porsche_taycan_2.jpg', 2),
('https://example.com/bmw_ix_m60_1.jpg', 3),
('https://example.com/bmw_ix_m60_2.jpg', 3),
('https://example.com/mercedes_eqs_1.jpg', 4),
('https://example.com/mercedes_eqs_2.jpg', 4),
('https://example.com/audi_e_tron_1.jpg', 5),
('https://example.com/audi_e_tron_2.jpg', 5),
('https://example.com/lucid_air_1.jpg', 6),
('https://example.com/lucid_air_2.jpg', 6),
('https://example.com/rivian_r1s_1.jpg', 7),
('https://example.com/rivian_r1s_2.jpg', 7),
('https://example.com/polestar_3_1.jpg', 8),
('https://example.com/polestar_3_2.jpg', 8),
('https://example.com/tesla_model3_1.jpg', 9),
('https://example.com/tesla_model3_2.jpg', 9),
('https://example.com/tesla_modelx_1.jpg', 10),
('https://example.com/tesla_modelx_2.jpg', 10),
('https://example.com/porsche_911_1.jpg', 11),
('https://example.com/porsche_911_2.jpg', 11),
('https://example.com/bmw_m3_1.jpg', 12),
('https://example.com/bmw_m3_2.jpg', 12),
('https://example.com/mercedes_c_class_1.jpg', 13),
('https://example.com/mercedes_c_class_2.jpg', 13),
('https://example.com/audi_a6_1.jpg', 14),
('https://example.com/audi_a6_2.jpg', 14);



INSERT INTO addresses (user_id, region, city, street, description) VALUES
(1, 'Toshkent viloyati', 'Toshkent', 'Amir Temur ko`chasi 15', 'Katta do`kon yonida'),
(2, 'Samarqand viloyati', 'Samarqand', 'Bog`ishamol ko`chasi 20', 'Maktabga yaqin'),
(3, 'Buxoro viloyati', 'Buxoro', 'Mustaqillik ko`chasi 7', 'Markaziy bozorga qarama-qarshi'),
(4, 'Farg`ona viloyati', 'Farg`ona', 'Alisher Navoiy ko`chasi 10', 'Park ichida joylashgan'),
(5, 'Andijon viloyati', 'Andijon', 'Bobur shoh ko`chasi 3', 'Qahvaxona ro`parasida');

INSERT INTO admins (first_name, last_name, email, password, phone, role)
VALUES ('Super', 'Admin', 'super@admin.com', 'hashed_password_here', '+998901234567', 'super_admin');

INSERT INTO admins (first_name, last_name, email, password, phone)
VALUES ('Ali', 'Valiyev', 'ali@example.com', 'hashed_password_here', '+998901122334');


INSERT INTO car_credits (user_id, car_id, total_price, down_payment, monthly_payment, month_count, interest_rate, start_date, end_date, status) VALUES
(1, 1, 129990.00, 25000.00, 2000.00, 60, 0.08, '2025-07-01 10:00:00', '2030-07-01 10:00:00', 'active'),
(2, 5, 140000.00, 30000.00, 2200.00, 50, 0.07, '2025-06-15 11:30:00', '2029-08-15 11:30:00', 'active'),
(3, 8, 75000.00, 15000.00, 1200.00, 48, 0.09, '2025-05-20 14:00:00', '2029-05-20 14:00:00', 'active'),
(1, 10, 99990.00, 20000.00, 1800.00, 55, 0.085, '2025-07-05 09:00:00', '2030-02-05 09:00:00', 'active'),
(5, 13, 48000.00, 10000.00, 800.00, 40, 0.09, '2025-06-01 16:00:00', '2028-10-01 16:00:00', 'active');

INSERT INTO credit_payments (car_credit_id, due_date, amount, paid_amount, status, paid_at) VALUES
(1, '2025-08-01', 2000.00, 0.00, 'pending', NULL),
(1, '2025-09-01', 2000.00, 0.00, 'pending', NULL),
(1, '2025-10-01', 2000.00, 0.00, 'pending', NULL),
(2, '2025-07-15', 2200.00, 2200.00, 'paid', '2025-07-10 10:00:00'),
(2, '2025-08-15', 2200.00, 0.00, 'pending', NULL),
(3, '2025-07-20', 1200.00, 0.00, 'pending', NULL),
(4, '2025-08-05', 1800.00, 0.00, 'pending', NULL),
(5, '2025-07-01', 800.00, 800.00, 'paid', '2025-06-28 15:00:00'),
(5, '2025-08-01', 800.00, 0.00, 'pending', NULL);


SELECT * FROM users;

SELECT * FROM addresses;

SELECT * FROM cars;

SELECT * FROM models;

SELECt * FROM carImages;

SELECT * FROM admins;

SELECT * FROM car_credits;

SELECT * FROM credit_payments;




SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE credit_payments;
TRUNCATE TABLE passed_credits;
TRUNCATE TABLE car_credits;
TRUNCATE TABLE carImages;
TRUNCATE TABLE cars;
TRUNCATE TABLE models;
TRUNCATE TABLE brands;
TRUNCATE TABLE addresses;
TRUNCATE TABLE users;
TRUNCATE TABLE admins;