

const GenerarJWTi = require("../helpers/generar-JWT");
const VerificarTokenGooglei = require("../helpers/validar-googleSignIn");

module.exports={

    ...GenerarJWTi,
    ...VerificarTokenGooglei
}