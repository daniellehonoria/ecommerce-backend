
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
}

export type TPurchase={
    buyer_id:string
    id:string
    productId:string
    quantity:number
    total_price:number
    created_at:string
    paid:boolean
}

