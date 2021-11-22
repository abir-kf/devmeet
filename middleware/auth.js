const jwt = require('jsonwebtoken');
const config = require('config');//to get the jwtsecret


//this function is middleware fct caiuse it contains next() :callback  what we have to run once we re done so that it moves on to the next piece.. to do next apres traitement li kdir had fct v3.5
module.exports = function(req, res, next) {

    //Get token from header (url)
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));//verifie si c'est the right token et le decode et le met dans la decoded variable

        req.user = decoded.user; //(req.user hia request li dkhl an3tiwha dak decoded.user howa id li kayn f token) ? and we can use it in any of the routes (protected routes) v3.5
        next();
    } catch(err){
        res.status(401).json({ msg: 'Token is not valid' });

    }
}