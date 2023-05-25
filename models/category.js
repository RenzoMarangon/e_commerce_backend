const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    name:{
        type: String,
        required:[true, 'Category required'],
        unique:true,
    },
    state:{
        type: Boolean,
        default:true,
        required:true,
    },
    user:{
        type: Schema.Types.ObjectId,
        required:true,
    }
});

categorySchema.methods.toJSON = function()
{
    const { __v, state, ...data } = this.toObject();
    data.uid = _id;
    return data;
}

module.exports = model( 'Category', categorySchema );