import express from "express";
import morgan from "morgan";
import {apiRouter} from "./routes/api";
import helmet from "helmet";
import config from "dotenv";
import db from "./models/index";

//To import environment variables
config.config(); 

const app = express();

//Settings
app.set("port", process.env.PORT || 3000);
app.set("serverName", process.env.NAME);

//Middlewares
app.use(morgan("dev"));
app.use(helmet.xssFilter());  //Due to security reasons
app.use(express.urlencoded({extended: false})); //To understand forms
app.use(express.json()); //To understand json. We are going to send and receive json

//Routes
app.use("/API", apiRouter);

//Sync-database
db.sequelize.sync({force: true}).then(() => {
    //Start server
    app.listen(app.get("port"), () => {
        console.log("Server " + app.get("serverName") + " listening on port " + app.get("port"));
    });
});
