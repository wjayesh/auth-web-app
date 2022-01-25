const jwt = require('jsonwebtoken');

private_key = "" + process.env.PRIVATE_KEY;

const authenticationLogin = (req, res, next) => {
    // Extract JWT from the header and check whether it is valid or not
    var token = req.header('auth-token');
    var data;
   
    // returns 401 status in case JWT is invalid or expired
    try {
        data = jwt.verify(token, private_key);
    } catch(e) {
        console.log(e);
        res.status(401);
        res.send("Token Expired!");
        return;
    }
    
    // token is valid and verified. 
    // We will then decrypt the token and put the value into some field in 'req'
    // so that it is accessed afterwards by any other middleware/the request handler

    req.userInfo = data;
    next();
  };

module.exports = authenticationLogin;
