const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`,
  }),
  issuer: `https://${process.env.AUTH_DOMAIN}/`,
  algorithms: ["RS256"],
});

const handleAuthExceptions = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    console.log(err); 
    
    res.status(err.status).json({ errors: [{ message: err.message }] });
    res.end();
  }
};

module.exports = {
  checkJwt,
  handleAuthExceptions,
}