-- Active: 1673891332498@@127.0.0.1@3306
CREATE TABLE users( -- cria tabela
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
-- Create User
-- method HTTP (POST)
-- path ("/users")
-- body
-- id
-- name
-- email
-- password
-- createdAt
-- response
-- status 201
-- "Cadastro realizado com sucesso"

DROP TABLE users;
INSERT INTO users(id, name, email, password)
VALUES ("u001", "Pablo","pablo@mail.com", "senha123"), 
("u002","Gloria", "gloria@mail.com", "2147f"), 
("u003","Ana Carolina", "anac@mail.com", "senha345"),
("u004","Cassia", "cassia@mail.com", "gdsbv23"), 
("u005", "Liniker","liniker@mail.com", "dsf4"), 
("u006","Djavan", "djavan@mail.com", "dbfg222"),
("u007","Pericles", "pericles@mail.com", "jdh12");

SELECT*FROM users;
SELECT email FROM users;
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT  NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    imageURL TEXT,
    category TEXT NOT NULL
);

SELECT*FROM products;
DROP TABLE products;


--Get All Users -- retorna todos os usuários cadastrados
SELECT*FROM users;

--Get All Products-- retorna todos os produtos cadastrados
SELECT*FROM products;

--Search Product by name-- 
SELECT * FROM products
WHERE name ="croissant";

--Create Product-- 
INSERT INTO products(id, name, price, description, imageURL, category)
VALUES ("001", "sonho", 6.50, "pão doce, frito e recheado","https://imagensemoldes.com.br/wp-content/uploads/2020/05/Sonho-Doces-PNG.png","BREAD"),
 ("002", "pão de leite", 1.30,"pão feito com leite, farinha e ovos","https://thumbs.dreamstime.com/b/p%C3%A3o-de-leite-em-fundo-branco-franc%C3%AAs-num-172673083.jpg", "BREAD"),
 ("003", "torta de palmito", 31, "Torta vegana recheada com palmito","https://i0.statig.com.br/bancodeimagens/au/ih/zp/auihzpzmxnvstxiv5x1nbbgpf.jpg", "CAKE"),
 ("004", "broa de milho", 6.25, "Paozinho vegano feito a partir da farinha de milho","https://thumbs.dreamstime.com/b/p%C3%A3o-brasileiro-de-milho-em-fundo-branco-isolado-queijo-caseiro-chamado-broa-ou-broinha-alimentos-junho-e-julho-do-june-189019510.jpg", "BREAD"),
 ("005", "torta de morango", 26.50,"Torta com massa de bisoito, creme branco e morangos", "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3209848:1648478607/torta%20de%20morango.jpg?f=16x9&h=240&w=425&$p$f$h$w=6e1ebfb", "CAKE"),
 ("006", "bolo de laranja", 20, "Bolo simples de laranja","https://tudoela.com/wp-content/uploads/2018/12/como-fazer-bolo-de-laranja-810x608.jpg","CAKE"),
 ("007", "pão francês", 0.90, "Paozinho francês fresquinho","https://i.pinimg.com/originals/c8/dc/0f/c8dc0f722cffc5cef826add0a314a8e1.jpg", "BREAD"),
 ("008", "baguete", 8.50, "Pão de aproximadamente 30 cm", "https://img.freepik.com/fotos-premium/pao-baguete-no-fundo-branco_1339-57054.jpg?w=2000","BREAD"),
 ("009", "torta de frango", 33, "Torta recheada com frango e requeijão","https://claudia.abril.com.br/wp-content/uploads/2020/02/receita-torta-frango-catupiry.jpg?quality=85&strip=info", "CAKE"),
 ("010", "pão integral", 1.50,"Pão francês feito com farinha integral", "https://trimais.vteximg.com.br/arquivos/ids/1023808-1000-1000/foto_original.jpg?v=637604821054100000", "BREAD"),
 ("011", "bisnaguinha", 13.50, "Mini pãezinhos artesanais tipo bisnaguinha" ,"https://static.wixstatic.com/media/923345_3bb6bb01fa914acb906da23fd3234008~mv2.png/v1/fill/w_1772,h_1772,al_c/923345_3bb6bb01fa914acb906da23fd3234008~mv2.png","BREAD"),
 ("012", "pão de queijo", 7,"Pão de queijo feito com polvilho e queijo canastra","https://panutti.com.br/arquivos/produtos/imagens_adicionais/P%C3%A3o%20de%20Queijo-209.jpg", "BREAD"),
 ("013", "torta holandesa", 9, "Torta de bolacha com ganache e creme branco","https://www.receitasdemae.com.br/wp-content/uploads/2011/10/torta-holandesa.jpg","BREAD"),
 ("014", "cupcake", 9.99, "Bolinhos individuais de sabores diversos", "https://cdn1-production-images-kly.akamaized.net/Odj6Em98u6S7g7ij23nNHsylBII=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/769894/original/003686400_1416569314-url.jpg","CAKE"),
 ("015", "croissant", 8.50, "Pão de massa folhada", "https://i0.wp.com/porkworld.com.br/wp-content/uploads/2021/07/croissant-receita-como-fazer.png?fit=1920%2C1280&ssl=1", "BREAD"),
 ("016", "carolina", 4.50, "Pão doce recheado com doce de leite e coberto com chocolate", "https://emporiokaminski.com.br/wp-content/uploads/2020/06/carolina-03.jpg","BREAD"),
 ("017", "bolo de fubá", 18, "Bolo vegano feito com fubá", "https://www.ocadomilho.com/wp-content/uploads/2018/05/OCA-DO-MILHO-fundo-branco-98.jpg", "CAKE"),
 ("018", "alfajor", 9.50,"Biscoitos argentinos com recheio de doce de leite e cobertura de chocolate","https://i0.wp.com/anamariabraga.globo.com/wp-content/uploads/2020/06/alfajor-de-chocolate-diet.jpg?fit=1200%2C675&ssl=1", "COOKIE"),
 ("019", "enroladinho de presunto", 3.50,"Paozinho recheado com presunto e queijo","https://www.tortamania.com.br/files/product/image/118/xvga_tortamania_saldado.png", "BREAD"),
 ("021", "dadinho de tapioca", 0.90,"Quadradinhos fritos de tapioca com queijo", "https://images.rappi.com.br/products/2098988396-1605144678192.png", "BREAD"),
 ("022", "empadinha", 7.90,"Tortinhas com massa amanteigada, sabores diversos", "https://http2.mlstatic.com/D_NQ_NP_217501-MLB20344654852_072015-O.jpg", "CAKE")
 ;


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


CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL, --guarda logica booleana--pedidos começam com paid valendo 0 e quando o pagamento for finalizado, se atualiza para 1.
    delivered_at TEXT,--gerencia data de entrega do pedido--Lembre-se da existência da função nativa DATETIME para gerar datas nesse formato.
    buyer_id TEXT NOT NULL, --FK = referencia a coluna id da tabela users
    FOREIGN KEY(buyer_id) REFERENCES users(id)
);
DROP TABLE purchases;

SELECT*FROM users;

INSERT INTO purchases 
VALUES
("p001", 68.30, 1 , NULL, "u001"),
("p002", 150, 1 , NULL, "u001"),
("p003", 41.20, 1 , NULL, "u002"),
("p004", 28.30, 0 , NULL, "u004"),
("p005", 23.25, 0 , NULL, "u002"),
("p006", 35.30, 1 , NULL, "u003"),
("p007", 42.10, 1 , NULL, "u005"),
("p008", 41.30, 0 , NULL, "u006"),
("p009", 25.30, 1 , NULL, "u006"),
("p010", 28.60, 1 , NULL, "u007");

SELECT * from purchases;

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;

UPDATE purchases
SET delivered_at = DATETIME()
WHERE id="p010";

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




