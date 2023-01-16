-- Active: 1673891332498@@127.0.0.1@3306
CREATE TABLE users( -- cria tabela
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users(id, email, password)
VALUES ("258", "user@user.com", "senha123");
INSERT INTO users(id, email, password)
VALUES ("214", "new@user.com", "2147f");
INSERT INTO users(id, email, password)
VALUES ("325", "user3@mail.com", "senha345");

SELECT*FROM users;
SELECT email FROM users;
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT  NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);
INSERT INTO products(id, name, price, category)
VALUES ("012", "pão de queijo", 7, "bread");

INSERT INTO products(id, name, price, category)
VALUES ("013", "bolo de banana", 23, "CAKE");

INSERT INTO products(id, name, price, category)
VALUES ("014", "cupcake", 9.99, "CAKE");
INSERT INTO products(id, name, price, category)
VALUES ("015", "croissant", 8.50, "BREAD");
SELECT*FROM products;

INSERT INTO products(id, name, price, category)
VALUES ("016", "carolina", 4.50, "BREAD");


INSERT INTO users(id, email, password) --insere dados à tabela
VALUES ("220", "user220@user.com", "gdsbv23"), ("221", "user221@user.com", "dsf4"), ("222", "user222@user.com", "dbfg222");

UPDATE users SET email= "emaileditado@mail.com" WHERE id ="325"; --edita dados da tabela

DELETE FROM users WHERE id = "221" -- deleta dados da tabela