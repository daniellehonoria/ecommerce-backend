import { users, product, purchase, createUser} from "./database";
import  express, { Request, Response} from 'express';
import cors from 'cors';
import { TProduct, TPurchase, TUser } from "./types";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});

// Agora crie endpoints para automatizar a manipulação dos dados do arquivo database.ts. 
//Por enquanto não se preocupe em validar as entradas, foque no caso de sucesso (caminho feliz).

// Get All Users
// method HTTP (GET)
// path ("/users")
// response
// status 200
// array de users do database.ts

//criação de requisição GET sem query. 1º parametro string, 2º funçao callback. 
//Os parametros da função callback são req, res com as devidas tipagens
app.get("/users", (req:Request, res:Response)=>{
    res.status(200).send(users) //send é o metodo q espera um dado, q no caso é users q está no database 
})

// Get All Products
// method HTTP (GET)
// path ("/products")
// response
// status 200
// array de products do database.ts
app.get("/products", (req:Request, res:Response)=>{
    res.status(200).send(product) //send é o metodo q espera um dado, q no caso é users q está no database 
})


// Search Product by name
// method HTTP (GET)
// path ("/product/search")
// query params
// q
// response
// status 200
// array do resultado da busca
app.get("/product/search", (req:Request, res:Response)=>{
    const q = req.query.q as string

    const productsFilter = product.filter(
        
        (product)=>product.name.includes(q)
    )
    res.status(200).send(productsFilter)
})

// Create User
// method HTTP (POST)
// path ("/users")
// body
// id
// email
// password
// response
// status 201
// "Cadastro realizado com sucesso"
app.post("/users", (req:Request, res:Response)=>{
    const id= req.body.id
    const email= req.body.email
    const password= req.body.password

const newUser: TUser={id, email, password}
users.push(newUser)
res.status(201).send("Cadastro realizado com sucesso")

})

// Create Product
// method HTTP (POST)
// path ("/products")
// body
// id
// name
// price
// category
// response
// status 201
// "Produto cadastrado com sucesso"

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
// method HTTP (POST)
// path ("/purchases")
// body
// userId
// productId
// quantity
// totalPrice
// response
// status 201
// "Compra realizada com sucesso"

app.post("/purchase", (req:Request, res:Response)=>{
    const userId= req.body.userId
    const productId=req.body.productId
    const quantity= req.body.quantity
    const totalPrice= req.body.totalPrice

const newPurchase: TPurchase={userId, productId, quantity, totalPrice}
purchase.push(newPurchase)
res.status(201).send("Compra realizada com sucesso")

})
console.log(users)
console.log(product)
console.log(purchase)