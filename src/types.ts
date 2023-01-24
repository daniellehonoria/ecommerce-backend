export enum Category{
    BREAD = "BREAD",
    COOKIE= "COOKIE",
    CAKE="CAKE"
}
export type TUser ={
    id: string
    name:string
    email:string
    password:string
}

export type TProduct={
    id: string
    name:string
    price:number
    description:string
    imageURL:string
    category:Category
}

export type TPurchase={
    buyer_id:string
    purchase_id:string
    productId:string
    quantity:number
    totalPrice:number
}

