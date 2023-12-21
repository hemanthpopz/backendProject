const express  = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const dbpath = path.join(__dirname,'test.db')
app.use(express.json())

const jwt = require('jsonwebtoken')
let db = null;



const bcrypt = require('bcrypt')

const init =  async() =>{
    try {
         db = await open({
            filename:dbpath,
            driver:sqlite3.Database
        })
        app.listen(4000,() =>{
            console.log('hello')
        })
    } catch (e) {

        console.log(`DB error ${e.error}`)
        
    }

}

init()



const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.send("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          next();
        }
      });
    }
  };



app.post('/register', async(request,response) =>{


    const {username,password} = request.body

   

    const getQuery = `SELECT * FROM users WHERE username='${username}';`;
    
    const result = await db.get(getQuery)

    if(result === undefined){

        const hashedpassword = await bcrypt.hash(password,10)

        const postQuery = `INSERT INTO users 
        (username,password)
        VALUES 
        ('${username}','${hashedpassword}');`;

        const postResult = await db.run(postQuery)
        response.send(' User Registered Successfully Please Login')


      }else{
        response.send('User Already Registered Please Login ')
      }

})

app.post('/login',async(request,response) =>{

    const {username,password} = request.body

    const LoginGetQuery = `SELECT * FROM users 
    WHERE username = '${username}'
    `

    const result = await db.get(LoginGetQuery)

    if(result === undefined){

        response.send('User Is Not Registered')

    }else{
        const comparePassword = await bcrypt.compare(password,result.password)
        
        if(comparePassword){

            const payload = {
                username:username
            }
            const token = await jwt.sign(payload,'MY_TOKEN')

            response.send(token)
        }else{
            response.send('Incorrect Password')
        }


    }

})


app.get('/todo',async(request,response) =>{


    const query = `SELECT * FROM users`

    const result = await db.all(query)

    response.send(result)




})
