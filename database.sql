CREATE DATABASE todolist;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE todos(
	todo_id SERIAL PRIMARY KEY,
	user_id uuid REFERENCES users(user_id),
  title  VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL
);