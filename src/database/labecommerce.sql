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

DELETE FROM users WHERE id = "221"; -- deleta dados da tabela

-----------EXERCICIO 1---------
--Get All Users -- retorna todos os usuários cadastrados
SELECT*FROM users;

--Get All Products-- retorna todos os produtos cadastrados
SELECT*FROM products;

--Search Product by name-- mocke um termo de busca, exemplo "monitor" -- retorna o resultado baseado no termo de busca
SELECT * FROM products
WHERE name ="croissant";

-- Create User-- mocke um novo usuário-- insere o item mockado na tabela users
INSERT INTO users(id, email, password)
VALUES ("22", "user8@mail.com", "jdh12");

--Create Product-- mocke um novo produto-- insere o item mockado na tabela products
INSERT INTO products(id, name, price, category)
VALUES ("001", "sonho", 6.50, "BREAD"),
 ("002", "pão de leite", 1.30, "BREAD"),
 ("003", "torta de palmito", 31, "CAKE"),
 ("004", "broa de milho", 6.25, "BREAD"),
 ("005", "torta de morango", 26.50, "CAKE"),
 ("006", "chipa de queijo", 1.50, "COOKIE"),
 ("007", "biscoito de polvilho", 8.50, "COOKIE"),
 ("008", "baguete de atum", 18.50, "BREAD"),
 ("009", "torta de frango", 33, "CAKE"),
 ("010", "pão integral", 1.50, "BREAD"),
 ("011", "pão de azeitona", 13.50, "BREAD"),
 ("013", "torta holandesa", 9, "BREAD"),
 ("017", "bolo de fubá", 18, "CAKE"),
 ("018", "catarina de gorgonzola", 17.50, "BREAD"),
 ("019", "enroladinho de presunto", 3.50, "BREAD"),
 ("021", "dadinho de tapioca", 0.90, "BREAD"),
 ("022", "pão francês", 0.90, "BREAD"),
 ("023", "bolo de laranja", 20, "CAKE");

----------EXERCÍCIO 2----------------

--Get Products by id--mocke uma id--busca baseada no valor mockado
SELECT * FROM products
WHERE id = "012";

--Delete User by id--mocke uma id--delete a linha baseada no valor mockado
DELETE FROM users WHERE id = "22";
SELECT * FROM products;
--Delete Product by id--mocke uma id--delete a linha baseada no valor mockado
DELETE FROM products WHERE id="013";

--Edit User by id--mocke valores para editar um user--edite a linha baseada nos valores mockados
UPDATE users SET email= "email@editado.com", password="1354" WHERE id ="222"; --edita dados da tabela

--Edit Product by id--mocke valores para editar um product--edite a linha baseada nos valores mockados
UPDATE products SET price= "3.6" WHERE id= "016";

----------EXERCÍCIO 3---------------
--Copie as queries do exercício 1 e refatore-as

--Get All Users -- retorna o resultado ordenado pela coluna name em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

--Get All Products versão 1
--retorna o resultado ordenado pela coluna price em ordem crescente
--limite o resultado em 20 iniciando pelo primeiro item
SELECT*FROM products
ORDER BY price ASC
LIMIT 20;

--Get All Products versão 2
--mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
--retorna os produtos com preços dentro do intervalo mockado em ordem crescente
SELECT * FROM products
WHERE price >="5" AND price <="15"
ORDER BY price ASC;


