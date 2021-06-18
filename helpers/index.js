

const GenerarJWTi = require("../helpers/generar-JWT");
const VerificarTokenGooglei = require("../helpers/validar-googleSignIn");
const customvalidatori = require("../helpers/custom-validators");
const subirarchivo = require("../helpers/subir-archivos");

module.exports={

    ...GenerarJWTi,
    ...VerificarTokenGooglei,
    ...subirarchivo,
    ...customvalidatori
}