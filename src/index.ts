import { users, product, purchase, createUser} from "./database";
import  express, { Request, Response} from 'express';
import cors from 'cors';
import { Category, TProduct, TPurchase, TUser } from "./types";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});


// Get All Users
app.get("/users", (req:Request, res:Response)=>{
    res.status(200).send(users) 
})

// Get All Products
app.get("/products", (req:Request, res:Response)=>{
    res.status(200).send(product) //send é o metodo q espera um dado, q no caso é users q está no database 
})


// Search Product by name
app.get("/product/search", (req:Request, res:Response)=>{
    const q = req.query.q as string

    const productsFilter = product.filter(
        
        (product)=>product.name.includes(q)
    )
    res.status(200).send(productsFilter)
})

// Create User
app.post("/users", (req:Request, res:Response)=>{
    const id= req.body.id
    const email= req.body.email
    const password= req.body.password

const newUser: TUser={id, email, password}
users.push(newUser)
res.status(201).send("Cadastro realizado com sucesso")

})

// Create Product
app.post("/newproduct", (req:Request, res:Response)=>{
    const id= req.body.id
    const name=req.body.name
    const price= req.body.price
    const category= req.body.category

const newProduct: TProduct={id, name, price, category}
product.push(newProduct)
res.status(201).send("Produto cadastrado com sucesso")

})
// Create Purchase
app.post("/purchase", (req:Request, res:Response)=>{
    const userId= req.body.userId
    const productId=req.body.productId
    const quantity= req.body.quantity
    const totalPrice= req.body.totalPrice

const newPurchase: TPurchase={userId, productId, quantity, totalPrice}
purchase.push(newPurchase)
res.status(201).send("Compra realizada com sucesso")

})
console.log(users, product, purchase)

//-------------------------------EXERCÍCIO 1----------------------------------
// Get Products by id
// method HTTP (GET)
// path ("/products/:id")
// response
// status 200
// objeto product encontrado
app.get("/product/:id", (req:Request, res:Response)=>{
    const id = req.params.id
    const filterProductId = product.find((prdct)=>
         prdct.id === id
    )
     res.status(200).send(filterProductId)
})

// Get User Purchases by User id
// method HTTP (GET)
// path ("/users/:id/purchases")
// response
// status 200
// array de compras do user procurado
app.get("/users/:id/purchases", (req:Request, res:Response)=>{
    const id = req.params.id
    const filterIdPurchases = purchase.filter((prchs)=>
    prchs.userId === id
    )
    res.status(200).send(filterIdPurchases)
})
//filter = retorna array
//find = retorna um item ou undefined
//findIndex= retorna o item a partir do indice
//-------------------------------EXERCÍCIO 2----------------------------------

// Delete User by id
// method HTTP (DELETE)
// path ("/user/:id")
// response
// status 200
// "User apagado com sucesso"
app.delete("/user/:id", (req:Request, res:Response)=>{
    const id = req.params.id

    //findIndex encontra o indice do item a ser removido
    const delUser = users.findIndex((usr)=> usr.id === id)

    //só deleta caso o indice seja válido (ou seja, encontrou o item)
    if (delUser >= 0){
        //splice p/ editar diretamente o array accounts
        //primeiro arg é o indice o alvo
        //segundo arg é quantos itens serão removidos a partir do alvo
        users.splice(delUser, 1)
    }
    res.status(200).send("User deletado com sucesso")
})


// Delete Product by id
// method HTTP (DELETE)
// path ("/product/:id")
// response
// status 200
// "Produto apagado com sucesso"
app.delete("/product/:id", (req:Request, res:Response)=>{
    const id = req.params.id

    const delProduct = product.findIndex((prdct)=> prdct.id === id)

    if (delProduct >= 0){
        product.splice(delProduct, 1)
    }
    res.status(200).send("Produto deletado com sucesso")
})
//-------------------------------EXERCÍCIO 3----------------------------------

// Edit User by id
// method HTTP (PUT)
// path ("/user/:id")
// body
// email (parâmetro opcional)
// password (parâmetro opcional)
// response
// status 200
// "Cadastro atualizado com sucesso"
app.put("/user/:id", (req:Request, res:Response)=>{
    const id = req.params.id
    
    const newId = req.body.id as string | undefined
    const newEmail = req.body. email as string | undefined
    const newPassword = req.body.password as string | undefined
   
    const userEdit = users.find((userEdit)=> userEdit.id === id)

    if (userEdit){
        userEdit.id = (newId === undefined ? userEdit.id : newId)
        userEdit.email = (newEmail === undefined? userEdit.email : newEmail)
        userEdit.password = (newPassword === undefined ? userEdit.password : newPassword)
    }
    res.status(200).send("Atualização realizada")
})

// Edit Product by id
// method HTTP (PUT)
// path ("/product/:id")
// body
// name (parâmetro opcional)
// price (parâmetro opcional)
// category (parâmetro opcional)
// response
// status 200
// "Produto atualizado com sucesso"
// Lembre-se de referenciar o material para ordenar as rotas corretamente ;)

app.put("/product/:id", (req:Request, res:Response)=>{
    const id = req.params.id

    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as Category | undefined

   
    const productEdit = product.find((productEdit)=> productEdit.id === id)

    if (productEdit){
        productEdit.name = (newName === undefined ? productEdit.name : newName)
        productEdit.price = (newPrice === undefined? productEdit.price : newPrice)
        productEdit.category = (newCategory === undefined ? productEdit.category : newCategory)
    }
    res.status(200).send("Atualização realizada")
})