import { TProduct, TPurchase, TUser, Category } from "./types";

export const users: TUser[] = [
    {
        id: "01",
        email: "fulana@mail",
        password: "abc02",
    },{
        id: "02",
        email: "beltrana@mail.com",
        password: "abc123",
    }]

// createUser (cria uma nova pessoa na lista de users)
export function createUser(id:string, email:string, password:string):void{
    const newUser: TUser={id, email, password}
    users.push(newUser)
    console.log(`o usuário ${id} de email ${email} foi cadastrado com sucesso`)
  }
  createUser("03", "pablo@mail.com", "121314")
  console.log(users)


//getAllUsers (busca todas as pessoas da lista de users)
export function getAllUsers():void{
    users.map((user)=>{
        console.table(user)
    })
}
console.log("Lista de usuários")
getAllUsers()

export const product: TProduct[] = [
    {
        id: "01",
        name: "Cookie brilha",
        price: 8,
        category: Category.COOKIE,
    },{
        id: "02",
        name: "Trança da Queen Bey",
        price: 19,
        category: Category.BREAD,
    }]

// createProduct (cria um novo produto na lista de products)
export function createProduct(id:string, name:string, price:number, category:Category):void{
    const newProduct:TProduct={id, name, price, category}
    product.push(newProduct)
    console.log(`O produto ${name} foi cadastrado com sucesso`)
}
createProduct("24562", "focaccia", 15, Category.BREAD)


// getAllProducts (busca todos os produtos da lista de products)
export function getAllProducts():void{
    product.map((prdct)=>{
        console.table(prdct)
    })
}
console.log("Lista de produtos")
getAllProducts()


// getProductById (busca por produtos baseado em um id da lista de products)
export function getProductById(idToSearch:string):void{
    console.table(product.find(prdct=>prdct.id === idToSearch))

}
getProductById("02")

export const purchase: TPurchase[] = [
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

]

// queryProductsByName (busca por produtos baseado em um nome da lista de products)
export const queryProductsByName = (q:string): Array<TProduct> =>{
    return product.filter((prdct)=>{
        return prdct.name.includes(q)
    })
}
queryProductsByName("Cookie brilha")


// createPurchase (cria uma nova compra na lista de purchases)
export const createPurchase = (userId:string, productId:string, quantity:number, totalPrice:number): void=>{
    const newPurchase: TPurchase[]=[{userId, productId, quantity, totalPrice}]
    purchase.push(...newPurchase)
    console.log("Compra realizada com sucesso")
}
createPurchase("02", "02", 3, 19*3)

// getAllPurchasesFromUserId 
export const getAllPurchasesFromUserId =(userIdToSearch: string): Array<TPurchase>=>{
    return purchase.filter((prchs)=>{
        return prchs.userId === userIdToSearch
    })
}