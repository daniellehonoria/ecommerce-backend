"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.purchase = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.product = exports.getAllUsers = exports.createUser = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "01",
        email: "fulana@mail",
        password: "abc02",
    }, {
        id: "02",
        email: "beltrana@mail.com",
        password: "abc123",
    }
];
function createUser(id, email, password) {
    const newUser = { id, email, password };
    exports.users.push(newUser);
    console.log(`o usuário ${id} de email ${email} foi cadastrado com sucesso`);
}
exports.createUser = createUser;
createUser("03", "pablo@mail.com", "121314");
console.log(exports.users);
function getAllUsers() {
    exports.users.map((user) => {
        console.table(user);
    });
}
exports.getAllUsers = getAllUsers;
console.log("Lista de usuários");
getAllUsers();
exports.product = [
    {
        id: "01",
        name: "Cookie brilha",
        price: 8,
        category: types_1.Category.COOKIE,
    }, {
        id: "02",
        name: "Trança da Queen Bey",
        price: 19,
        category: types_1.Category.BREAD,
    }
];
function createProduct(id, name, price, category) {
    const newProduct = { id, name, price, category };
    exports.product.push(newProduct);
    console.log(`O produto ${name} foi cadastrado com sucesso`);
}
exports.createProduct = createProduct;
createProduct("24562", "focaccia", 15, types_1.Category.BREAD);
function getAllProducts() {
    exports.product.map((prdct) => {
        console.table(prdct);
    });
}
exports.getAllProducts = getAllProducts;
console.log("Lista de produtos");
getAllProducts();
function getProductById(idToSearch) {
    console.table(exports.product.find(prdct => prdct.id === idToSearch));
}
exports.getProductById = getProductById;
getProductById("02");
exports.purchase = [
    {
        userId: "01",
        productId: "02",
        quantity: 3,
        totalPrice: 24,
    },
    {
        userId: "02",
        productId: "01",
        quantity: 2,
        totalPrice: 38
    }
];
const queryProductsByName = (q) => {
    return exports.product.filter((prdct) => {
        return prdct.name.includes(q);
    });
};
exports.queryProductsByName = queryProductsByName;
(0, exports.queryProductsByName)("Cookie brilha");
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = [{ userId, productId, quantity, totalPrice }];
    exports.purchase.push(...newPurchase);
    console.log("Compra realizada com sucesso");
};
exports.createPurchase = createPurchase;
(0, exports.createPurchase)("02", "02", 3, 19 * 3);
const getAllPurchasesFromUserId = (userIdToSearch) => {
    return exports.purchase.filter((prchs) => {
        return prchs.userId === userIdToSearch;
    });
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map