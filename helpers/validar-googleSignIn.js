const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);


const VerificarTokenGoogle= async(idToken)=> {
  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENTID
     
  });
  const
   {name:nombre,
    picture:img,
    email:correo
  }  = ticket.getPayload();
 // const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  return {nombre,img,correo};
}

module.exports={
    VerificarTokenGoogle
}

