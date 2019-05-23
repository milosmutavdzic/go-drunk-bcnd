var db = require('../../database');

module.exports.updateUserController = (req, res) => {
    const now = new Date();
    let { data } = req.body;
    data = {...data, updated_at: now};
    
    db('users').where({ email: data.email }).update(data)
        .then((isUpdated) => {
            res.status(isUpdated ? 200 : 404 ).json({
                success: !!isUpdated,
                message: isUpdated ? 'Updated successfuly' : 'User not found'
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: err.sqlMessage ? err.sqlMessage : "Internal server error"
            });
        });
}