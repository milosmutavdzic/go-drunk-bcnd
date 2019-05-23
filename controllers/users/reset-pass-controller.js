var db = require('../../database');
var bcrypt = require('bcrypt');

module.exports.resetPasswordController = (req, res) => {
    const { username, oldpassword, password, rpassword } = req.body;
    db.select().from('users').where({ username: username }).first()
        .then(data => {
            if (
                data &&
                bcrypt.compareSync(oldpassword, data.password) &&
                password === rpassword) {
                const hash = bcrypt.hashSync(password, 10);
                return db('users').where({ username: username }).update({ password: hash })
                .then(() => {
                        res.status(200).json({
                            success: true,
                            message: `Password changed sucessfully`
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            success: false,
                            message: err ? err : `Internal server error`
                        });
                    });

            } else {
                res.status(401).json({
                    success: false,
                    message: "Wrong username or password"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: err ? err : `Internal server error`
            });
        });
}