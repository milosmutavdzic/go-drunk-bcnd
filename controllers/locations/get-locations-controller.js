var db = require('../../database');

module.exports.getLocationsController = (req, res) => {
    db.select('id','user_id','lng','lat','patrol_type','vote_number', 'percentage','updated_at').from('locations').where({active: 1})
    .then(data => {
        res.status(200).json({
            success: true,
            data: data
        })
    }).catch(err => {
        res.status(500).json({
            success: false,
            error: err.sqlMessage ? err.sqlMessage : "Internal server error"
        });
    });
}