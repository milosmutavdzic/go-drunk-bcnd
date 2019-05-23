var db = require('../../database');

module.exports.getUserController = (req, res) => {
    db.select('id', 'username', 'email', 'phone', 'firstName', 'lastName', 'address', 'city', 'country')
    .from('users').where({ id: req.query.id }).first()
        .then(data => {
            if (!data) {
                res.status(404).json({
                    success: false,
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: data
                });
            }
        }).catch(err => {
            res.status(500).json({
                success: false,
                error: err.sqlMessage ? err.sqlMessage : "Internal server error"
            });
        });
}