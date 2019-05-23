var db = require('../../database');

module.exports.newLocationController = (req, res) => {
    const now = new Date();
    let { data } = req.body;
    data = {...data, created_at: now, updated_at: now };
    db.insert(data).into('locations').then(() => {
        res.status(200).json({
            success: true,
            message: `Thanks for the report`
        })
    }).catch(err => {
        res.status(500).json({
            success: false,
            error: err.sqlMessage ? err.sqlMessage : "Internal server error"
        });
    });
}