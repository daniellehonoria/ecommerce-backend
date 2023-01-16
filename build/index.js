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
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/products", (req, res) => {
    try {
        res.status(200).send(database_1.product);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/product/search", (req, res) => {
    const q = req.query.q;
    try {
        const name = req.params.name;
        if (name !== undefined) {
            if (name.length < 1) {
                res.status(400);
                throw new Error("Insira ao menos 1 caracter");
            }
        }
        const productsFilter = database_1.product.filter((product) => product.name.includes(q));
        res.status(200).send(productsFilter);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post("/users", (req, res) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        const idExisting = database_1.users.find((users) => users.id === id);
        const emailExisting = database_1.users.find((users) => users.email === email);
        if (idExisting) {
            throw new Error("'Id' já cadastrado");
        }
        if (emailExisting) {
            throw new Error("'E-mail' já cadastrado");
        }
        const newUser = { id, email, password };
        database_1.users.push(newUser);
        res.status(201).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post("/newproduct", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const idExisting = database_1.product.find((product) => product.id === id);
    try {
        if (idExisting) {
            throw new Error("'Id' já cadastrado");
        }
        const newProduct = { id, name, price, category };
        database_1.product.push(newProduct);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post("/purchase", (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const totalPrice = req.body.totalPrice;
        const userIdExisting = database_1.users.find((users) => users.id === userId);
        if (!userIdExisting) {
            throw new Error("'Id' de usuário não encontrado");
        }
        const productIdExisting = database_1.product.find((product) => product.id === productId);
        if (!productIdExisting) {
            throw new Error("'Id' de produto não encontrado");
        }
        if (productId.price * quantity !== totalPrice) {
            res.status(400);
            throw new Error("Total incorreto");
        }
        const newPurchase = { userId, productId, quantity, totalPrice };
        database_1.purchase.push(newPurchase);
        res.status(201).send("Compra realizada com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
console.log(database_1.users, database_1.product, database_1.purchase);
app.get("/product/:id", (req, res) => {
    try {
        const id = req.params.id;
        const filterProductId = database_1.product.find((prdct) => prdct.id === id);
        if (!filterProductId) {
            res.status(404);
            throw new Error("Produto não encontrado. Verifique a 'id' .");
        }
        res.status(200).send(filterProductId);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/users/:id/purchases", (req, res) => {
    try {
        const id = req.params.id;
        const filterIdPurchases = database_1.purchase.filter((prchs) => prchs.userId === id);
        if (!filterIdPurchases) {
            res.status(400);
            throw new Error("Usuário não encontrado");
        }
        res.status(200).send(filterIdPurchases);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/user/:id", (req, res) => {
    try {
        const id = req.params.id;
        const idExisting = database_1.product.find((prdct) => prdct.id === id);
        const delUser = database_1.users.findIndex((usr) => usr.id === id);
        if (!idExisting) {
            res.status(400);
            throw new Error("Usuário não encontrado");
        }
        if (delUser >= 0) {
            database_1.users.splice(delUser, 1);
        }
        res.status(200).send("User deletado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/product/:id", (req, res) => {
    try {
        const id = req.params.id;
        const delProduct = database_1.product.findIndex((prdct) => prdct.id === id);
        const idExisting = database_1.product.find((prdct) => prdct.id === id);
        if (!idExisting) {
            res.status(400);
            throw new Error("Produto não encontrado");
        }
        if (delProduct >= 0) {
            database_1.product.splice(delProduct, 1);
        }
        res.status(200).send("Produto deletado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/user/:id", (req, res) => {
    try {
        const id = req.params.id;
        const newId = req.body.id;
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        const userEdit = database_1.users.find((userEdit) => userEdit.id === id);
        if (!userEdit) {
            res.status(400);
            throw new Error("Usuário não encontrado");
        }
        if (userEdit) {
            userEdit.id = (newId === undefined ? userEdit.id : newId);
            userEdit.email = (newEmail === undefined ? userEdit.email : newEmail);
            userEdit.password = (newPassword === undefined ? userEdit.password : newPassword);
        }
        res.status(200).send("Atualização realizada");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/product/:id", (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    const productEdit = database_1.product.find((productEdit) => productEdit.id === id);
    try {
        if (!productEdit) {
            throw new Error("Produto não encontrado");
        }
        if (productEdit) {
            productEdit.name = (newName === undefined ? productEdit.name : newName);
            productEdit.price = (newPrice === undefined ? productEdit.price : newPrice);
            productEdit.category = (newCategory === undefined ? productEdit.category : newCategory);
        }
        res.status(200).send("Atualização realizada");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
//# sourceMappingURL=index.js.map