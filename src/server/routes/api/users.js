import {Router} from "express";
import db from "../../models/index";
import config from "dotenv";
import Sequelize from "sequelize";
//To import environment variables
config.config();

const  router = Router();

router.get("/", async(req, res) => {
    const users = await db.user.findAndCountAll();
    let result = {
       rows: users.rows,
       totalRows: users.count
    }
    res.status(200).json(result);
});

router.get("/name/:name", async(req, res) => {
    const Op = Sequelize.Op;
    const users = await db.user.findAndCountAll({
        where: {
            name: {
                [Op.like]: "%" + req.params.name + "%",
            }
        }
    });
    let result = {
        rows: users.rows,
        totalRows: users.count
    }
    res.status(200).json(result);
 });

router.get("/surname/:surname", async(req, res) => {
    const Op = Sequelize.Op;
    const users = await db.user.findAndCountAll({
        where: {
            surname: {
                [Op.like]: "%" + req.params.surname + "%",
            }
        }
    });
    let result = {
       rows: users.rows,
       totalRows: users.count
    }
    res.status(200).json(result);
});

router.post("/", async(req, res) => {
    console.log("db: " + db);
    const user = await db.user.create(req.body).catch(Sequelize.ValidationError, function (err) {
        res.status(400).json(err);
    });
    res.status(201).json(user);    
});

module.exports.userRoutes = router;