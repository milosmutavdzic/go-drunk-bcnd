var db = require('../database');

module.exports.votingController = (req, res) => {
    let { location_id, user_id, valid_location } = req.body;
    const now = new Date();
    var updatedLocation = {};
    db.insert({ location_id, user_id, valid_location }).into('votes')
    .then(() => db.select('vote_number', 'percentage').from('locations').where({id: location_id}).first())
    .then((data) => {
        let {vote_number, percentage } = data;
        if(!vote_number) { percentage = valid_location ? 100 : 0 }
        else {
            let vote_up = Math.ceil(vote_number * percentage * 0.01);
            valid_location ? ++vote_up : null;
            percentage = Math.ceil(vote_up * 100 / (vote_number + 1));
        }
        vote_number++;
        updatedLocation = {updated_at: now, vote_number: vote_number, percentage: percentage}
        return updatedLocation;
    })
    .then((data) => db('locations').where({id: location_id}).update(data))
    .then(() => {
        res.status(200).json({
            success: true,
            message: `Voted sucessfully`,
            updatedLocation: updatedLocation
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            error: (err.errno === 1062) ? 'You already voted' : (err.sqlMessage ? err.sqlMessage : "Internal server error")
        });
    });
}