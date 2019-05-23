var db = require('../database');

module.exports.locationsSync = () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    db.select('id').from('locations').where('updated_at', '<', date).andWhere({active: 1})
        .then(ids => {
            // convert id's array of objects [{id: 1},..]  to array of Integers
            ids.forEach( (item, i) => { ids[i]=item.id });
            return db('locations').where('id', 'in', ids).update({ active: false })
        })
        .then(oldLocationsCount => console.log(`${oldLocationsCount} old locations successfuly deleted`))
        .catch(error => {
            console.log(`${error} occured while proccessing locations syncronization...`)
        });
}