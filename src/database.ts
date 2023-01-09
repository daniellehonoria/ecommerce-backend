import { TProduct, TPurchase, TUser, Category } from "./types";
/*Desenvolva uma função para cada funcionalidade. Você pode colocá-las no arquivo database.ts.
Chame cada uma no index.ts e verifique se estão funcionando dando console.log.
Não se preocupe em validar os dados por enquanto, desenvolva apenas os casos de sucesso (caminho feliz). */

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
//Exercício 2 04/01
// createUser (cria uma nova pessoa na lista de users)
// input: três parâmetros (id, email e password)
// output: frase de sucesso ("Cadastro realizado com sucesso")
// exemplo de chamada: createUser("u003", "beltrano@email.com", "beltrano99")
export function createUser(id:string, email:string, password:string):void{
    const newUser: TUser={id, email, password}
    users.push(newUser)
    console.log(`o usuário ${id} de email ${email} foi cadastrado com sucesso`)
  }
  createUser("03", "pablo@mail.com", "121314")
  console.log(users)


/*//Exercício 2 04/01

getAllUsers (busca todas as pessoas da lista de users)
input: nenhum
output: lista atualizada de users
exemplo de chamada: getAllUsers() */
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

    ////Exercício 2 04/01

// createProduct (cria um novo produto na lista de products)
// input: três parâmetros (id, name, price e category)
// output: frase de sucesso ("Produto criado com sucesso")
// exemplo de chamada: createProduct("p004", "Monitor HD", 800, PRODUCT_CATEGORY.ELECTRONICS)
export function createProduct(id:string, name:string, price:number, category:Category):void{
    const newProduct:TProduct={id, name, price, category}
    product.push(newProduct)
    console.log(`O produto ${name} foi cadastrado com sucesso`)
}

createProduct("24562", "focaccia", 15, Category.BREAD)

//Exercício 2 04/01

// getAllProducts (busca todos os produtos da lista de products)
// input: nenhum
// output: lista atualizada de products
// exemplo de chamada: getAllProducts()

export function getAllProducts():void{
    product.map((prdct)=>{
        console.table(prdct)
    })
}
console.log("Lista de produtos")
getAllProducts()

//Exercício 2 04/01

// getProductById (busca por produtos baseado em um id da lista de products)
// input: um parâmetro (idToSearch)
// output: o produto encontrado ou undefined
// exemplo de chamada: getProductById("p004")
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

// Exercício 3 04/01 - Funcionalidades
// Desenvolva uma função para cada funcionalidade.

// Product
// queryProductsByName (busca por produtos baseado em um nome da lista de products)
// input: um parâmetro (q)
// q é a abreviação de query (termo de busca/consulta)
// output: lista de produtos com nomes que contenham o termo de busca
// extra: o resultado da busca deve ser case insensitive
// exemplo de chamada: queryProductsByName("monitor")
export const queryProductsByName = (q:string): Array<TProduct> =>{
    return product.filter((prdct)=>{
        return prdct.name.includes(q)
    })
}
queryProductsByName("Cookie brilha")
// Purchase
// createPurchase (cria uma nova compra na lista de purchases)
// input: quatro parâmetros (userId, productId, quantity e totalPrice)
// output: frase de sucesso ("Compra realizada com sucesso")
// exemplo de chamada: createPurchase("u003", "p004", 2, 1600)



export const createPurchase = (userId:string, productId:string, quantity:number, totalPrice:number): void=>{
    const newPurchase: TPurchase[]=[{userId, productId, quantity, totalPrice}]
    purchase.push(...newPurchase)
    console.log("Compra realizada com sucesso")
}
createPurchase("02", "02", 3, 19*3)

// getAllPurchasesFromUserId (busca todas as compras feitas baseado no id do usuário)
// input: userIdToSearch
// output: lista atualizada de compras nas quais o userId delas são do userIdToSearch
// exemplo de chamada: getAllPurchasesFromUserId("u003")

export const getAllPurchasesFromUserId =(userIdToSearch: string): Array<TPurchase>=>{
    return purchase.filter((prchs)=>{
        return prchs.userId === userIdToSearch
    })
}