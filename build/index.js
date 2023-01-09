"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});
app.get("/users", (req, res) => {
    res.status(200).send(database_1.users);
});
app.get("/products", (req, res) => {
    res.status(200).send(database_1.product);
});
app.get("/product/search", (req, res) => {
    const q = req.query.q;
    const productsFilter = database_1.product.filter((product) => product.name.includes(q));
    res.status(200).send(productsFilter);
});
app.post("/users", (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = { id, email, password };
    database_1.users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.post("/newproduct", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const newProduct = { id, name, price, category };
    database_1.product.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
});
app.post("/purchase", (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;
    const newPurchase = { userId, productId, quantity, totalPrice };
    database_1.purchase.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso");
});
console.log(database_1.users);
console.log(database_1.product);
console.log(database_1.purchase);
//# sourceMappingURL=index.js.map