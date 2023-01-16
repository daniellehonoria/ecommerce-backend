import { users, product, purchase, createUser } from "./database";
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Category, TProduct, TPurchase, TUser } from "./types";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});

// ## Get All Users
// - não precisa de validação, basta refatorar para o uso do try/catch
// Get All Users
app.get("/users", (req: Request, res: Response) => {

    try {
        res.status(200).send(users)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Get All Products
// ## Get All Products
// - não precisa de validação, basta refatorar para o uso do try/catch
app.get("/products", (req: Request, res: Response) => {
    try {
        res.status(200).send(product) //send é o metodo q espera um dado, q no caso é users q está no database 
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

// Search Product by name
// ## Search Product by name
// - query params deve possuir pelo menos um caractere
app.get("/product/search", (req: Request, res: Response) => {
    const q = req.query.q as string

    try {
        const name = req.params.name
        if (name !== undefined) {
            if (name.length < 1) {
                res.status(400)
                throw new Error("Insira ao menos 1 caracter")

            }
        }

        const productsFilter = product.filter(

            (product) => product.name.includes(q)
        )
        res.status(200).send(productsFilter)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {//tratamento de erro pra erro inesperado
            res.status(500)
        }
        res.send(error.message)
    }

})

// Create User

// ## Create User
// - validar o body
// - extra:
//     - não deve ser possível criar mais de uma conta com a mesma id
//     - não deve ser possível criar mais de uma conta com o mesmo e-mail
app.post("/users", (req: Request, res: Response) => {
    try {        
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password

        const idExisting = users.find((users)=> users.id === id)
        const emailExisting = users.find((users)=> users.email === email)



        if (idExisting) {
			throw new Error("'Id' já cadastrado") 
		}
        if (emailExisting) {
			throw new Error("'E-mail' já cadastrado") 
		}
        const newUser: TUser = { id, email, password }
        users.push(newUser)
        res.status(201).send("Cadastro realizado com sucesso")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
// ## Create Product
// - validar o body
// - extra:
//     - não deve ser possível criar mais de um produto com a mesma id
// Create Product
app.post("/newproduct", (req: Request, res: Response) => {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category
        const idExisting = product.find((product)=> product.id === id)

    try {

        if (idExisting) {
			throw new Error("'Id' já cadastrado") 
		}        
        const newProduct: TProduct = { id, name, price, category }
        product.push(newProduct)
        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {//tratamento de erro pra erro inesperado
            res.status(500)
        }
        res.send(error.message)
    }
})

// ## Create Purchase
// - validar o body
// - extra:
//     - id do usuário que fez a compra deve existir no array de usuários cadastrados
//     - id do produto que foi comprado deve existir no array de produtos cadastrados
//     - a quantidade e o total da compra devem estar com o cálculo correto
// Create Purchase
app.post("/purchase", (req: Request, res: Response) => {
    
    try {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const userIdExisting = users.find((users)=> users.id === userId)

    if (!userIdExisting) {
        throw new Error("'Id' de usuário não encontrado") 
    }    
    
    const productIdExisting = product.find((product)=> product.id === productId)
    if (!productIdExisting) {
        throw new Error("'Id' de produto não encontrado") 
    }


    if(productId.price * quantity !== totalPrice){
        res.status(400)
        throw new Error("Total incorreto") 


    }
    const newPurchase: TPurchase = { userId, productId, quantity, totalPrice }
    purchase.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }

})
console.log(users, product, purchase)

// Get Products by id
// validar que o produto existe
app.get("/product/:id", (req: Request, res: Response) => {
    
    try {
        const id = req.params.id
    const filterProductId = product.find((prdct) => prdct.id === id)
            
    if(!filterProductId){//se result for falsy(ñ encontrar id p/ atribuir a var), apontar erro 400
        res.status(404)//res.statusCode= 404
        throw new Error("Produto não encontrado. Verifique a 'id' .")
    }res.status(200).send(filterProductId)

    } catch (error:any) {
        console.log(error)
        
        if (res.statusCode === 200){  //se apresentar erro, mas ñ for erro q eu previ, redefinir p/ erro 500      
            res.status(500)
}        res.send(error.message)
        
    }
})

// Get User Purchases by User id
// validar que o usuário existe
app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
    const id = req.params.id
    const filterIdPurchases = purchase.filter((prchs) =>
        prchs.userId === id
    )
    if(!filterIdPurchases){
    res.status(400)
    throw new Error ("Usuário não encontrado")
}
    res.status(200).send(filterIdPurchases)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
//filter = retorna array
//find = retorna um item ou undefined
//findIndex= retorna o item a partir do indice

// Delete User by id

// validar que o usuário existe
app.delete("/user/:id", (req: Request, res: Response) => {

    try {
    const id = req.params.id
    const idExisting = product.find((prdct)=> prdct.id === id)

    //findIndex encontra o indice do item a ser removido
    const delUser = users.findIndex((usr) => usr.id === id)
    if(!idExisting){
        res.status(400)
        throw new Error("Usuário não encontrado")
    }
    //só deleta caso o indice seja válido (ou seja, encontrou o item)
    if (delUser >= 0) {
        //splice p/ editar diretamente o array accounts
        //primeiro arg é o indice o alvo
        //segundo arg é quantos itens serão removidos a partir do alvo
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

// validar que o produto existe
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

// validar que o usuário existe
// validar o body
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

// validar que o produto existe
// validar o body
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