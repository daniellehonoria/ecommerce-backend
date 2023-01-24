import { users, product, purchase, createUser } from "./database";
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Category, TProduct, TPurchase, TUser } from "./types";
import { db } from "./database/knex";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});
/*-- Get All Users
-- method HTTP (GET)
-- path ("/users")
-- response
-- status 200
-- array de users do arquivo .db*/

app.get("/users", async (req: Request, res: Response) => {

    try {
        const result = await db.raw(`
        SELECT * FROM users;
    `)
    res.status(200).send({ user: result })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Get All Products
// method HTTP (GET)
// path ("/products")
// response
// status 200
// array de products do arquivo .db
app.get("/products", async(req: Request, res: Response) => {
    try {const result = await db.raw(`
    SELECT * FROM products;
    `)//se existir algo dentro desse select, prossiga abaixo

    res.status(200).send({ products: result }) //send é o metodo q espera um dado, q no caso é users q está no database 
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

// Search Product by name
// method HTTP (GET)
// path ("/product/search")
// query params
// q
// response
// status 200
// array do resultado da busca no arquivo .db

app.get("/product/search", async (req: Request, res: Response) => {
    const q = req.query.q as string

    try {
         if (q !== undefined) {
            if (q.length < 1) {
                res.status(400)
                throw new Error("Insira ao menos 1 caracter")

            }
        }
        const [prdct] = await db.raw(`
            SELECT * FROM products
            WHERE name = "${q}" ;
        `);

        res.status(200).send({product: prdct})
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {//tratamento de erro pra erro inesperado
            res.status(500)
        }
        res.send(error.message)
    }

})

// Create User
// method HTTP (POST)
// path ("/users")
// body
// id
// name
// email
// password
// createdAt
// response
// status 201
// "Cadastro realizado com sucesso"
app.post("/users", async (req: Request, res: Response) => {
    try {        
        const {id, name, email, password} = req.body
        const idExisting = users.find((users)=> users.id === id)
        const emailExisting = users.find((users)=> users.email === email)

        if (idExisting) {
            res.status(400)
			throw new Error("'Id' já cadastrado") 
		} if (emailExisting) {
            res.status(400)
			throw new Error("'E-mail' já cadastrado") 
		} 
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' inválido, deve ser uma string")
        } if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' inválido, deve ser string")
        } if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' inválido, deve ser string")
        } 
        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'senha' inválida, deve ser string")
        } 
        if (id.length < 1 || name.length < 1) {
            res.status(400)
            throw new Error("'id' ou 'name' devem ter no minimo 1 caracter")
        }  await db.raw(`
        INSERT INTO users (id, name, email, password)
        VALUES ("${id}", "${name}", "${email}", "${password}")
        `) 
        res.status(201).send("Cadastro realizado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

// Create Product
// method HTTP (POST)
// path ("/products")
// body
// id
// name
// price
// description
// imageUrl
// response
// status 201
// "Produto cadastrado com sucesso"
app.post("/newproduct", async(req: Request, res: Response) => {
        const {id, name, price, description, imageUrl, category} = req.body
        const idExisting = product.find((product)=> product.id === id)

    try {

        if (idExisting) {
			throw new Error("'Id' já cadastrado") 
		}        
       if (typeof id !== "string"|| typeof name !== "string"||typeof description !== "string" ||typeof category !== "string") {
            res.status(400)
            throw new Error("Todos os dados devem ser string")
        } if (id.length < 1 || name.length < 1|| price.length < 1 ||category.length < 1) {
            res.status(400)
            throw new Error("Id, nome, preço e categoria devem ter no minimo 1 caracter")
        } await db.raw(`
        INSERT INTO products (id, name,  price, description, imageUrl, category)
        VALUES ("${id}", "${name}", "${price}", "${description}", "${imageUrl}", "${category}")
        `) 
        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Create Purchase
// method HTTP (POST)

// path ("/purchases")

// body

// id
// buyer
// totalPrice
// createdAt
// paid
// response

// status 201
// "Compra cadastrada com sucesso"
app.post("/purchase", async(req: Request, res: Response) => {
    
    try {
    const purchaseId = req.body.purchase_id
    //const productId = req.body.productId
   // const quantity = req.body.quantity
    const buyerId = req.body.buyer_id// id do comprador(user)
    const totalPrice = req.body.total_price
    const paid = req.body.paid;//pago
    //const delivered_at = req.body.delivered_at;


    const purchaseIdExisting = purchase.find((purchase)=> purchase.purchase_id === purchaseId)

    if (purchaseIdExisting) {
        throw new Error("Id já cadastrada, digite uma nova") 
    }  
    if (typeof purchaseId !== "string") {
        res.status(400)
        throw new Error("'id' inválido, deve ser uma string")
    } 
    if (totalPrice !== undefined){
        if (typeof totalPrice !== "number"){
            res.status(400);
            throw new Error ("Valor de Preço Total inválido! Favor, informar um numero.");
        }
    }if (buyerId === undefined){
            res.status(400);
            throw new Error ("Id de cliente não informado.");
    }
    await db.raw(`
    INSERT INTO users (purchaseId, totalPrice, paid, buyer_id)
    VALUES (("${purchaseId}",${totalPrice}, ${paid}, "${buyerId}"))
    `) 
    res.status(201).send("Compra realizada com sucesso")
} catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}

})
console.log(users, product, purchase)

// Get Products by id

// method HTTP (GET)
// path ("/products/:id")
// response
// status 200
// objeto encontrado do arquivo .db
app.get("/product/:id", async(req: Request, res: Response) => {
    
    try {
        const idProduct = req.params.id
    // const filterProductId = product.find((prdct) => prdct.id === id)//product é array do database
            
    // if(!filterProductId){//se result for falsy(ñ encontrar id p/ atribuir a var), apontar erro 400
    //     res.status(404)//res.statusCode= 404
    //     throw new Error("Produto não encontrado. Verifique a 'id' .")
    // }
    const [prdct] = await db.raw(`
    SELECT * FROM products
    WHERE id = "${idProduct}" ;

`);res.status(200).send({product: prdct})//product é o arry de obj de database

    } catch (error:any) {
        console.log(error)
        
        if (res.statusCode === 200){  //se apresentar erro, mas ñ for erro q eu previ, redefinir p/ erro 500      
            res.status(500)
}        res.send(error.message)
        
    }
})

// Get User Purchases by User id
// method HTTP (GET)
// path ("/users/:id/purchases")
// response
// status 200
// array de compras do user no arquivo .db
app.get("/users/:id/purchases", async(req: Request, res: Response) => {
    try {
    const idUser = req.params.id

    if(!idUser){
    res.status(400)
    throw new Error ("Usuário não encontrado")
}
const [searchToUserId] = await db.raw(`
    SELECT * FROM users
    WHERE ID ="${idUser}"
`)
    res.status(200).send({idUser:searchToUserId})//perguntar pq recebe{}
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Delete User by id
app.delete("/user/:id", (req: Request, res: Response) => {

    try {
    const id = req.params.id
    const idExisting = product.find((prdct)=> prdct.id === id)

    const delUser = users.findIndex((usr) => usr.id === id)
    if(!idExisting){
        res.status(400)
        throw new Error("Usuário não encontrado")
    }
    if (delUser >= 0) {
        users.splice(delUser, 1)
    }
    res.status(200).send("User deletado com sucesso") 
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})


// Delete Product by id
app.delete("/product/:id", (req: Request, res: Response) => {

    try {    
    const id = req.params.id
    const delProduct = product.findIndex((prdct) => prdct.id === id)
    const idExisting = product.find((prdct)=> prdct.id === id)

    if(!idExisting){
        res.status(400)
        throw new Error("Produto não encontrado")
    }
    if (delProduct >= 0) {
        product.splice(delProduct, 1)
    }
    res.status(200).send("Produto deletado com sucesso")
        
    }catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

// Edit User by id
app.put("/user/:id", (req: Request, res: Response) => {

    try {
    const id = req.params.id
    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const userEdit = users.find((userEdit) => userEdit.id === id)
    if(!userEdit){
        res.status(400)
        throw new Error("Usuário não encontrado")
    }
    if (userEdit) {
        userEdit.id = (newId === undefined ? userEdit.id : newId)
        userEdit.email = (newEmail === undefined ? userEdit.email : newEmail)
        userEdit.password = (newPassword === undefined ? userEdit.password : newPassword)
    }
    res.status(200).send("Atualização realizada")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
   
})

// Edit Product by id
app.put("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as Category | undefined
    const productEdit = product.find((productEdit) => productEdit.id === id)
try {
    if (!productEdit) {
    throw new Error("Produto não encontrado") 
}
    if (productEdit) {
        productEdit.name = (newName === undefined ? productEdit.name : newName)
        productEdit.price = (newPrice === undefined ? productEdit.price : newPrice)
        productEdit.category = (newCategory === undefined ? productEdit.category : newCategory)
    }
    res.status(200).send("Atualização realizada")
} catch (error: any) {
    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    }
    res.send(error.message)
}
    
})

//https://documenter.getpostman.com/view/24460604/2s8ZDU64nU

