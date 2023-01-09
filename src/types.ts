/*Exercício 1 04/01

Refatore o type da entidade product no types.ts
utilize um enum para definir pelo menos 3 categorias*/

export enum Category{
    BREAD = "BREAD",
    COOKIE= "COOKIE",
    CAKE="CAKE"
}
export type TUser ={
    id: string
    email:string
    password:string
}

export type TProduct={
    id: string
    name:string
    price:number
    category:Category
}

export type TPurchase={
    userId:string
    productId:string
    quantity:number
    totalPrice:number
}

