require('dotenv').config();
const express = require('express'),
    app = express();
const {keycloak, memoryStore} = require("./config/keycloakConfig");
const session = require('express-session');
const PORT = process.env.PORT || 8081;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {upload} = require('./config/imageSaveConfig');
const propertyRouteHandler = require('./routes/propertyRouteHandler')


app.use(
    session(
        {
            secret: 'mySecret',
            resave: false,
            saveUninitialized: true,
            store: memoryStore,
        }
    )
);



mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log('db connection succesful')})
.catch((err) => {console.log(err)});


app.use(keycloak.middleware());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload);
app.use(cors({
    origin: "*"
}));


app.use('/api/v1/lekki', propertyRouteHandler);




app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
});