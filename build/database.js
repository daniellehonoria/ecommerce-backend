"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.product = exports.user = void 0;
exports.user = [
    {
        id: "01",
        email: "email@mail",
        password: "abc02",
    }, {
        id: "02",
        email: "email@mail.com",
        password: "abc123",
    }
];
exports.product = [
    {
        id: "01",
        name: "Primeiro produto",
        price: 29,
        category: "produto teste",
    }, {
        id: "02",
        name: "outro produto",
        price: 40,
        category: "produto aleatório",
    }
];
exports.purchase = [
    {
        userId: "01",
        productId: "02",
        quantity: 3,
        totalPrice: 99,
    },
    {
        userId: "02",
        productId: "01",
        quantity: 2,
        totalPrice: 55
    }
];
//# sourceMappingURL=database.js.map