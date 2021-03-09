const express = require('express');
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const storage = multer.diskStorage({
    destination: './public/uploads/',
})

const upload = multer({
    storage: storage,
});

dotenv.config();

const app = express();
const port = process.env.PORT||3000;
const mongoUrl = process.env.MONGO_URL;
 

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req,res)=>{
    res.end('api works');
})

app.post('/upload', upload.single("image"), (req, res)=>{
        
    const result = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        fileImage: req.file
    };

    res.send(result);
});

app.post('/upload',(req,res)=>{
    let datos=req.body;
    let imagen=req.file;
    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client)=>{
        if(err) {
             console.log('Ocurrio un error',err);
        }
        console.log('Connected to Mongo');
        const db = client.db();
        collection.insertOne({usuario: form.name, email: form.email, password: form.password, image: image.path});
        client.close();
     });
})


app.listen(port, () =>{
    console.log('app is listening in port '+port);
})