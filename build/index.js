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
console.log(database_1.users, database_1.product, database_1.purchase);
app.get("/product/:id", (req, res) => {
    const id = req.params.id;
    const filterProductId = database_1.product.find((prdct) => prdct.id === id);
    res.status(200).send(filterProductId);
});
app.get("/users/:id/purchases", (req, res) => {
    const id = req.params.id;
    const filterIdPurchases = database_1.purchase.filter((prchs) => prchs.userId === id);
    res.status(200).send(filterIdPurchases);
});
app.delete("/user/:id", (req, res) => {
    const id = req.params.id;
    const delUser = database_1.users.findIndex((usr) => usr.id === id);
    if (delUser >= 0) {
        database_1.users.splice(delUser, 1);
    }
    res.status(200).send("User deletado com sucesso");
});
app.delete("/product/:id", (req, res) => {
    const id = req.params.id;
    const delProduct = database_1.product.findIndex((prdct) => prdct.id === id);
    if (delProduct >= 0) {
        database_1.product.splice(delProduct, 1);
    }
    res.status(200).send("Produto deletado com sucesso");
});
app.put("/user/:id", (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const userEdit = database_1.users.find((userEdit) => userEdit.id === id);
    if (userEdit) {
        userEdit.id = (newId === undefined ? userEdit.id : newId);
        userEdit.email = (newEmail === undefined ? userEdit.email : newEmail);
        userEdit.password = (newPassword === undefined ? userEdit.password : newPassword);
    }
    res.status(200).send("Atualização realizada");
});
app.put("/product/:id", (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    const productEdit = database_1.product.find((productEdit) => productEdit.id === id);
    if (productEdit) {
        productEdit.name = (newName === undefined ? productEdit.name : newName);
        productEdit.price = (newPrice === undefined ? productEdit.price : newPrice);
        productEdit.category = (newCategory === undefined ? productEdit.category : newCategory);
    }
    res.status(200).send("Atualização realizada");
});
//# sourceMappingURL=index.js.map