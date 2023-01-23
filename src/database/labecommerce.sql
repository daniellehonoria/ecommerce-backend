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

INSERT INTO users(id, email, password) 
VALUES ("220", "user220@user.com", "gdsbv23"), ("221", "user221@user.com", "dsf4"), ("222", "user222@user.com", "dbfg222");

UPDATE users SET email= "emaileditado@mail.com" WHERE id ="325"; 

DELETE FROM users WHERE id = "221"; 

--Get All Users -- retorna todos os usuários cadastrados
SELECT*FROM users;

--Get All Products-- retorna todos os produtos cadastrados
SELECT*FROM products;

--Search Product by name-- 
SELECT * FROM products
WHERE name ="croissant";

-- Create User-- 
INSERT INTO users(id, email, password)
VALUES ("22", "user8@mail.com", "jdh12");

--Create Product-- 
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


--Get Products by id--
SELECT * FROM products
WHERE id = "012";

--Delete User by id--
DELETE FROM users WHERE id = "22";
SELECT * FROM products;
--Delete Product by id--
DELETE FROM products WHERE id="013";

--Edit User by id--mocke valores para editar um user--edite a linha baseada nos valores mockados
UPDATE users SET email= "email@editado.com", password="1354" WHERE id ="222"; --edita dados da tabela

--Edit Product by id--
UPDATE products SET price= "3.6" WHERE id= "016";

--Get All Users -- retorna o resultado ordenado pela coluna name em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

--Get All Products 1--price em ordem crescente- max 20 resultados a partir do primeiro item
SELECT*FROM products
ORDER BY price ASC
LIMIT 20;

--Get All Products 2-- intervalo de preços mockado exibidos em ordem crescente
SELECT * FROM products
WHERE price >="5" AND price <="15"
ORDER BY price ASC;

/*Exercício 1
Criação da tabela de pedidos
nome da tabela: purchases
colunas da tabela:
id (TEXT, PK, único e obrigatório)
total_price (REAL, único e obrigatório)
paid (INTEGER e obrigatório)
delivered_at (TEXT e opcional)
buyer_id (TEXT, obrigatório e FK = referencia a coluna id da tabela users)
Observações
A coluna paid será utilizada para guardar uma lógica booleana. O SQLite recomenda o uso do número 0 para false e 
1 para true. Os pedidos começam com paid valendo 0 e quando o pagamento for finalizado, se atualiza para 1.

A coluna delivered_at será utilizada para gerenciar a data de entrega do pedido. Ela é opcional, porque sempre começará 
sem valor ao criar um pedido, ou seja, null. O SQLite recomenda utilizar TEXT para lidar com strings no formato ISO8601 
"aaaa-mm-dd hh:mm:sss". Lembre-se da existência da função nativa DATETIME para gerar datas nesse formato.*/

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL, --guarda logica booleana--pedidos começam com paid valendo 0 e quando o pagamento for finalizado, se atualiza para 1.
    delivered_at TEXT,--gerencia data de entrega do pedido--Lembre-se da existência da função nativa DATETIME para gerar datas nesse formato.
    buyer_id TEXT NOT NULL, --FK = referencia a coluna id da tabela users
    FOREIGN KEY(buyer_id) REFERENCES users(id)
);
DROP TABLE purchases;

/*Exercício 2
Popule sua tabela de pedidos, criada no exercício anterior.
Por enquanto não se preocupe em adicionar produtos ao pedido, veremos isso na aula que vem.
Com isso em mente, crie um valor aleatório para o preço total do pedido.

a) Crie dois pedidos para cada usuário cadastrado
No mínimo 4 no total (ou seja, pelo menos 2 usuários diferentes) e devem iniciar com a data de entrega nula.

b) Edite o status da data de entrega de um pedido
Simule que o pedido foi entregue no exato momento da sua edição (ou seja, data atual).*/

INSERT INTO purchases VALUES("p001", 33.20, 1 , "18-01-2022", 258);
INSERT INTO purchases VALUES("p002", 38.25, 1 , "18-01-2022", 258);
SELECT*FROM users;

INSERT INTO purchases 
VALUES
("p001", 33.20, 1 , NULL, 258),
("p002", 38.25, 1 , NULL, 258),
("p003", 68.30, 1 , NULL, 214),
("p004", 28.30, 0 , NULL, 214),
("p005", 23.25, 0 , NULL, 325),
("p006", 35.30, 1 , NULL, 325),
("p007", 42.10, 1 , NULL, 220),
("p008", 41.30, 0 , NULL, 220),
("p009", 25.30, 1 , NULL, 222),
("p010", 28.60, 1 , NULL, 222);

/*Crie a query de consulta utilizando junção para simular um endpoint de histórico de compras de um determinado usuário.
Mocke um valor para a id do comprador, ela deve ser uma das que foram utilizadas no exercício 2.*/

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;

UPDATE purchases
SET delivered_at = DATETIME()
WHERE id="p010";

/*EXERCÍCIO 1
Criação da tabela de relações
nome da tabela: purchases_products
colunas da tabela:
purchase_id (TEXT e obrigatório, não deve ser único)
product_id (TEXT e obrigatório, não deve ser único)
quantity (INTEGER e obrigatório, não deve ser único)
Como essa lógica funciona?
Cada compra é registrada uma única vez na tabela purchases.
Cada produto da mesma compra é registrado uma única vez na tabela purchases_products.
Exemplo:
uma pessoa coloca 5 laranjas (p001) e 3 bananas (p002) no carrinho e confirma sua compra
a compra é registrada com id c001 na tabela purchases
a seguir, cada item do carrinho é registrado na tabela purchases_products
5 laranjas são registradas na tabela purchases_products (c001, p001, 5)
3 bananas são registradas na tabela purchases_products (c001, p002, 3)*/

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    FOREIGN key (product_id) REFERENCES products(id)
);
DROP TABLE purchases_products;
SELECT * from purchases_products;
--------------------EXERCÍCIO 2--------------------------
--Popule sua tabela purchases_products simulando 3 compras de clientes.

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES("p001","001", 5 ),
("p003","008", 7 ),
("p009","015", 3 );

--Consulta com junção INNER JOIN
--Mostre em uma query todas as colunas das tabelas relacionadas 
--(purchases_products, purchases e products).

SELECT 
purchases.id AS purchaseId,
purchases.total_price AS totalPrice,
purchases.paid,
purchases.delivered_at as deliverDate,
purchases.buyer_id as buyerId,
products.id as productId,
products.name as productName,
products.price,
products.category
FROM purchases
LEFT JOIN purchases_products
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;


--tabela pai  é a primeira q criei, ou uma tabela em q todos vao consumir
-- on chama interseção entre dados iguais nas tabelas pra eles ñ se repetirem
-- left join pra tabela de relaçao
-- inner join indexa informaçao de outra tabela