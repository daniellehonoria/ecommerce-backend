import { TProduct, TPurchase, TUser } from "./types";

export const user: TUser = [
{
    id: "01",
    email: "email@mail",
    password: "abc02",
},{
    id: "02",
    email: "email@mail.com",
    password: "abc123",
}]
export const product: TProduct = [
    {
        id: "01",
        name: "Primeiro produto",
        price: 29,
        category: "produto teste",
    },{
        id: "02",
        name: "outro produto",
        price: 40,
        category: "produto aleatório",
    }]

export const purchase: TPurchase = [
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

]

