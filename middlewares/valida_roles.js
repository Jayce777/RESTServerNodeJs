const { request, response } = require("express");

const ValidaRolAdministrador = (req = request, res = response, next) => {

    if (!req.usuarioautenticado) {

        return res.status(500).json({

            msg: 'No se puede validar el rol sin tener token'
        })
    }

    const { rol, nombre } = req.usuarioautenticado;

    if (rol !== 'ADMINISTRADOR') {

        return res.status(401).json({

            msg: `${nombre} no tiene los permisos para ejecutar esta acción`
        })
    }
    next();
};

const ValidaRoles =(...roles) => {

    return  (req = request, res = response, next)=>{
        //console.log(roles);
        if (!req.usuarioautenticado) {

            return res.status(500).json({
    
                msg: 'No se puede validar el rol sin tener token'
            })
        }

        const { rol, nombre } = req.usuarioautenticado;

        if(!roles.includes(rol)){
            return res.status(401).json({

                msg: `${nombre} no tiene los permisos para ejecutar esta acción, se requiere tener los roles ${roles} `
            })
        }

        next();
    };

};


module.exports = {
    ValidaRolAdministrador,
    ValidaRoles
}