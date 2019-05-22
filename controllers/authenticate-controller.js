var db = require('../database');
var bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res) => {
  const { username, password } = req.body;
  var criteria = (username.indexOf('@') === -1) ? {username: username} : {email: username};
  db.select().from('users').where(criteria).first()
    .then(data => {
      if (data && bcrypt.compareSync(password, data.password)) {
        // Create a token
        const payload = { id: data.id };
        const options = { expiresIn: '2d', issuer: 'MilosMutavdzicTest' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, options);
        res.status(200).json({
          success: true,
          message: 'Successfully authenticated',
          token: token,
          id: data.id
        })
      } else {
        res.status(401).json({
          success: false,
          error: "Wrong credentials"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: `Internal server error`
      });
    });
}