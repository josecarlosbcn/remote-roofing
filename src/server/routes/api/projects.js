import {Router} from "express";
import db from "../../models/index";
import config from "dotenv";
import Sequelize from "sequelize";
//To import environment variables
config.config();

const  router = Router();

router.get("/", async(req, res) => {
    const projects = await db.project.findAndCountAll();
    let result = {
       rows: projects.rows,
       totalRows: projects.count
    }
    res.status(200).json(result);
});

router.get("/name/:name", async(req, res) => {
    const Op = Sequelize.Op;
    const projects = await db.project.findAndCountAll({
        where: {
            name: {
                [Op.like]: "%" + req.params.name + "%",
            }
        }
    });
    let result = {
        rows: projects.rows,
        totalRows: projects.count
    }
    res.status(200).json(result);
 });

router.get("/description/:description", async(req, res) => {
    const Op = Sequelize.Op;
    const projects = await db.project.findAndCountAll({
        where: {
            body: {
                [Op.like]: "%" + req.params.description + "%",
            }
        }
    });
    let result = {
       rows: projects.rows,
       totalRows: projects.count
    }
    res.status(200).json(result);
});

router.get("/status/:status", async(req, res) => {
    const Op = Sequelize.Op;
    let status = req.params.status.split(",");
    const projects = await db.project.findAndCountAll({
        where: {
            status: {
                [Op.in]: status,
            }
        }
    }).catch(Sequelize.DatabaseError, (err) => {
        res.status(400).json(err);
    });
    let result = {
        rows: projects.rows,
        totalRows: projects.count
    }
    res.status(200).json(result);
 });

router.get("/assigned/:userID", async(req, res) => {
    const Op = Sequelize.Op;
    let usersID = req.params.userID.split(",");
    const projects = await db.project.findAndCountAll({
        where: {
            userID: {
                [Op.in]: usersID
            } 
        }
    });
    let result = {
       rows: projects.rows,
       totalRows: projects.count
    }
    res.status(200).json(result);
});

router.post("/", async(req, res) => {
    const project = await db.project.create(req.body).catch(Sequelize.ValidationError, function (err) {
        res.status(400).json(err);
    });
    res.status(201).json(project);    
});

module.exports.projectRoutes = router;