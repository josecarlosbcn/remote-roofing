import {Router} from "express";
import db from "../../models/index";
import config from "dotenv";
import Sequelize from "sequelize";
//To import environment variables
config.config();

const  router = Router();

router.get("/", async(req, res) => {
    const projects = await db.task.findAndCountAll();
    let result = {
       rows: projects.rows,
       totalRows: projects.count
    }
    res.status(200).json(result);
});


router.get("/:userID/:status/:score", async(req, res) => {
    let usersID = req.params.userID.split(",");
    let status = req.params.status.split(",");
    let Op = Sequelize.Op;
    const tasks = await db.task.findAndCountAll({
        where: {
            userID: {
                [Op.in]: usersID,
            },
            status: {
                [Op.in]: status,
            },
            score: {
                [Op.gte]: req.params.score
            }
        }        
    }).catch(Sequelize.DatabaseError, (err) => {
        res.status(400).json(err);
    });
    let result = {
        rows: tasks.rows,
        totalRows: tasks.count
    }
    res.status(200).json(result);
});

router.post("/", async(req, res) => {
    const task = await db.task.create(req.body).catch(Sequelize.ValidationError, function (err) {
        res.status(400).json(err);
    });
    res.status(201).json(task);    
});

module.exports.taskRoutes = router;