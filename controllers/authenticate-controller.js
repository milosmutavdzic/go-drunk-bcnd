var db = require('../database');
var bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res) => {
  const { username, email, password } = req.body;
  let condition = !!username ? {username: username} : {email: email};

  db.select().from('users').where(condition).first()
    .then(data => {
      if (data.password && bcrypt.compareSync(password, data.password)) {
        // Create a token
        const payload = { id: data.id };
        const options = { expiresIn: '2d', issuer: 'MilosMutavdzicTest' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, options);
        res.status(200).json({
          success: true,
          message: 'successfully authenticated',
          token: token
        })
      } else {
        res.status(401).json({
          success: false,
          message: "Wrong credentials"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err
      });
    });
}