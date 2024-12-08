# ProyectoGrado


This README file provides instructions for setting up and running the "ProyectoGrado" application, which is designed for managing restaurant reservations for Gastro-bar La Consentida. The project includes the development of a MySQL database and a Node.js application for handling back-end operations.

## Requirements

To run this project, ensure you have the following tools and dependencies installed:

-Node.js v22.11.0 or later
-NPM v10.9.0 or later
Installed packages:
express
mysql
body-parser
cors
-MySQL Server 8.0 or later

To install the required Node.js packages, use the command:

npm install express mysql body-parser cors

## Configure database.

Follow these steps to set up the MySQL database:

1. Log into your MySQL server and create the database:


CREATE DATABASE LaConsentida;
USE LaConsentida;

2. Create the reservas table:

CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    turno VARCHAR(50) NOT NULL,
    hora TIME NOT NULL,
    personas INT NOT NULL
);

This table is designed to store reservation data, including:

id: A unique identifier for each reservation.
fecha: The date of the reservation.
turno: The time slot (e.g., lunch or dinner).
hora: The specific time for the reservation.
personas: The number of people for the reservation.

## Execute script

1. Create a connection file (e.g., connection.js)

2. Run the application:

node connection.js

This script starts a Node.js server and connects it to the MySQL database. Reservations can now be submitted via HTTP POST requests to the /reservas endpoint

## Interest links

Download nodejs windows: https://nodejs.org/en
    Hint: in the case we have problems with the authorization in windows, use the next command to execute scripts: *Set-ExecutionPolicy Unrestricted* .