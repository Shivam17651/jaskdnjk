const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    title : String,
    owner : { type : Types.ObjectId, ref : 'users' },
    createdAt: {type : Date, default : Date.now}
})


module.exports = model('rooms', mySchema);