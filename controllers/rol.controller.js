const { response, request } = require('express');

const { DBConnectionMySQL } = require('../database/config.db');

const table = 'rol';
const queryestado = true;

const RolesMysqlGet = async (req = request, res = response) => {

    try {
        const db = await DBConnectionMySQL();
        const roles = await db.query(`SELECT * from ${table} where estado=${queryestado}`);
        const total = roles.length;

        return res.json({
            total,
            roles
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Se produjo un error, comuníquese con el Administrador'
        })
    }
};

const RolesMysqlPost = async (req = request, res = response) => {


    try {
        const { nombre } = req.body;
        const data = {
            nombre
        };
        const db = await DBConnectionMySQL();
        await db.query(`{INSERT INTO ${table} set ?`, [data]);
        res.status(201).json({
            msg: 'Registro agregado correctamente'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Se produjo un error, comuníquese con el Administrador'
        })
    }

}



module.exports = {
    RolesMysqlGet,
    RolesMysqlPost
}