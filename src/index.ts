import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from "./database/knex";


const app = express();
app.use(express.json());
app.use(cors());
app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});

//---------ENDPOINTS BANCO DE DADOS USUARIOS-------------

// Busca todos os usuários 
app.get("/users", async (req: Request, res: Response) => {

    try {
    //     const result = await db.raw(`
    //     SELECT * FROM users;
    // `)
    const result = await db("users")
    res.status(200).send({ users: result })//users 

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
// Cria novos usuarios 
app.post("/users", async (req: Request, res: Response) => {
    try {        
        const {id, name, email, password} = req.body        
        const users = await db("users").where(id)

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
        }  
        // await db.raw(`
        // INSERT INTO users (id, name, email, password)
        // VALUES ("${id}", "${name}", "${email}", "${password}")
        // `) 
        const newUser ={
            idUser: id,
            nameUser: name,
            emailUser:email,
            passwordUser:password
        }
        await db ("users").insert(newUser)
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
// Edita usuario pelo id 
app.put("/user/:id", async(req: Request, res: Response) => {

    try {
    const idToEdit = req.params.id
    const newName = req.body.name as string | undefined
    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            } if (newId.length < 1) {
                res.status(400)
                throw new Error("'id' deve possuir no mínimo 1 caractere")
            }
        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            } if (newName.length < 1) {
                res.status(400)
                throw new Error("'name' deve possuir no mínimo 1 caractere")
            }
        }
        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            } if (newEmail.length < 1) {
                res.status(400)
                throw new Error("'id' deve possuir no mínimo 1 caractere")
            }
        }
        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            } if (newPassword.length < 1) {
                res.status(400)
                throw new Error("'name' deve possuir no mínimo 1 caractere")
            }
        }
    const [userEdited] =await db("users").where({id:idToEdit})
    if(userEdited){

        const upDateUser={
            id: newId ||userEdited.id,
            name: newName ||userEdited.name,
            email: newEmail ||userEdited.email,
            password: newPassword || userEdited.password
    }
    await db("users")
    .update(upDateUser)
    .where({id:idToEdit})
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
// Deleta usuário pelo id
app.delete("/user/:id", async(req: Request, res: Response) => {

    try {
    const idUser = req.params.id
    
    const [usr] = await db("users") .where({id:idUser})
    if(usr){
        await db("users").del().where({id:idUser})
    } else{
        res.status(400)
        throw new Error("Id não econtrado")
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

//---------ENDPOINTS BANCO DE DADOS PRODUTOS-------------
//Lista todos os produtos 
app.get("/products", async(req: Request, res: Response) => {

    try {
    //     const result = await db.raw(`
    //     SELECT * FROM products;
    // `)
    
    const result = await db("products")
    res.status(200).send({ products: result })
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
//Busca produto pelo nome
app.get("/products/search", async (req: Request, res: Response) => {
    const nameProduct = req.query.name as string
    try {
         if (nameProduct !== undefined) {
            if (nameProduct.length < 1) {
                res.status(400)
                throw new Error("Insira ao menos 1 caracter")
            }
        }
        // const [prdct] = await db.raw(`
        //     SELECT * FROM products
        //     WHERE name = "${q}" ;
        // `);

        const [prdct]= await db("products").where({name:nameProduct})

        res.status(200).send({products: prdct})
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {//tratamento de erro pra erro inesperado
            res.status(500)
        }
        res.send(error.message)
    }
})
// Cria novo produto 
app.post("/newproduct", async(req: Request, res: Response) => {
    const {id, name, price, description, imageUrl, category} = req.body

try {
          
   if (typeof id !== "string"|| typeof name !== "string"||typeof description !== "string" ||typeof category !== "string") {
        res.status(400)
        throw new Error("Todos os dados devem ser string")
    } if (id.length < 1 || name.length < 1|| price.length < 1 ||category.length < 1) {
        res.status(400)
        throw new Error("Id, nome, preço e categoria devem ter no minimo 1 caracter")
    } 
    // await db.raw(`
    // INSERT INTO products (id, name,  price, description, imageUrl, category)
    // VALUES ("${id}", "${name}", "${price}", "${description}", "${imageUrl}", "${category}")
    // `) 
    const newProduct={
        id: id,
        name: name,
        price: price,
        description:description,
        imageURL:imageUrl,
        category: category
    }//lado esquerdo é o banco de dados
await db("products").insert(newProduct)
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
// Busca produto pelo id
app.get("/product/:id", async(req: Request, res: Response) => {
    
    try {
        const idProduct = req.params.id
    // const filterProductId = product.find((prdct) => prdct.id === id)//product é array do database
     // if(!filterProductId){//se result for falsy(ñ encontrar id p/ atribuir a var), apontar erro 400
    //     res.status(404)//res.statusCode= 404
    //     throw new Error("Produto não encontrado. Verifique a 'id' .")
    // }
//     const [prdct] = await db.raw(`
//     SELECT * FROM products
//     WHERE id = "${idProduct}" ;

// `)
const [prdctId]= await db("products").where({id:idProduct});
res.status(200).send({product: prdctId})//product é o arry de obj de database

    } catch (error:any) {
        console.log(error)
        
        if (res.statusCode === 200){  //se apresentar erro, mas ñ for erro q eu previ, redefinir p/ erro 500      
            res.status(500)
}        res.send(error.message)
        
    }
})
// Edita produto pelo id
app.put("/product/:id", async(req: Request, res: Response) => {
    const idToEdit = req.params.id
    const newId = req.body.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImage = req.body.imageURL as string | undefined
    const newCategory = req.body.category as string | undefined

try {

    const [prdct]= await db("products").where({id:idToEdit})
    if(prdct){
        const updateProduct= {
            id: newId || prdct.id,
            name: newName || prdct.name,
            price: newPrice || prdct.price,
            description: newDescription || prdct.description,
            imageURL: newImage || prdct.imageURL,
            category: newCategory ||prdct.category
        }
        await db("products")
        .update(updateProduct)
        .where({id:idToEdit})
    } else {
        res.status(404)
        throw new Error("'id' não encontrada")
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
// Deleta produto pelo id 
app.delete("/product/:id", async (req: Request, res: Response) => {

    try {    
    const idProduct = req.params.id
    const prdct = await db("products") .where({id:idProduct})

    if(prdct){
        await db("products").del().where({id:idProduct})
    }else{
        res.status(400)
        throw new Error("Id não encontrado")
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


//---------ENDPOINTS BANCO DE DADOS SACOLAS DE COMPRAS-------------
//Lista todas as purchases-- REFATORADO QUERY BUILDER
app.get("/purchases", async (req:Request, res:Response)=>{
    try {
        const allPurchases = await db("purchases")
        res.status(200).send(allPurchases)
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
//Cria nova sacola de compras 
app.post("/purchases", async(req: Request, res: Response) => {
    
    try {
    const purchaseId = req.body.id
    const totalPrice= req.body.total_price
    const paid= req.body.paid
    const created_at = req.body.created_at 
    const buyerId= req.body.buyer_id 
    const productId = req.body.product_id
  
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
    // await db.raw(`
    // INSERT INTO users (purchaseId, totalPrice, paid, buyer_id)
    // VALUES (("${purchaseId}",${totalPrice}, ${paid}, "${buyerId}"))
    // `) 

    const newPurchase ={
        id: purchaseId,//id é o nome na minha tabela sql
        total_price: totalPrice,
        paid:paid,
        created_at:created_at,
        buyer_id: buyerId,
        product_id: productId
    }
    await db("purchases").insert(newPurchase)//NOVA FORMA COM QUERY BUILDER-- Insere objeto criado antes

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
// Busca sacola pelo id 
app.get("/purchases/:id", async(req: Request, res: Response) => {
    try {
    const id = req.params.id

    if(!id){
    res.status(400)
    throw new Error ("Id não encontrado")
} 
const purchase_products = await db
.select("purchases_products.product_id", "products.*")
.from("purchases_products")
.leftJoin("products", "purchases_products.product_id", "products.id")
.where({ "purchase_id": id });

const [searcheToPurchase] = await db("purchases")
.select("purchases.*","users.email", "users.name")
.from("purchases")
.leftJoin("users",  "users.id", "purchases.buyer_id")
.where({"purchases.id":id})

    res.status(200).send({ compra: searcheToPurchase, produtos: purchase_products })
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
// Busca sacola pelo id do usuário
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
  
      const result = await db("purchases").where({ buyer_id: userId });
  
      res.status(200).send({ compras: result });
    } catch (error) {
      console.log(error);
  
      if (req.statusCode === 200) {
        res.status(500);
      }
  
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  });

//----Deleta purchase pelo id 
app.delete("/purchases/:id", async(req:Request, res:Response)=>{

    try {
        const idToDelete = req.params.id

        const [prchs]= await db("purchases").where({id: idToDelete})
        
        if (!prchs) {
            res.status(400)
            throw new Error("Id não encontrada")
        }

        await db("purchases").del().where({id: idToDelete})

        res.status(200).send({message: "Compra deletada"})

    }  catch (error) {
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


//Documentação API
//https://documenter.getpostman.com/view/24460604/2s8ZDU64nU




//Refatore o endpoint criado no exercício anterior para que o resultado bem sucedido 
//também retorne a lista de produtos registrados na compra.

// const [searcheToPurchaseId] = await db("purchases")
// .select("purchases.*","users.email", "users.name")
// .from("purchases")
// .leftJoin("users",  "users.id", "purchases.buyer_id")
// .where({"purchases.id":id})
// const products = await db.select("products*", "purchases_products.quantity")
// .from("purchases_products")
// .leftJoin("products", "purchase_id", "products.id")
// .where({"purchases_products.purchase_id":id})
// const prodcutsInPurchase = [{...searcheToPurchaseId, products:products}]