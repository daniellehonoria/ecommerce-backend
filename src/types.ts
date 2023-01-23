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
    id:string
    userId:string
    productId:string
    quantity:number
    totalPrice:number
}

