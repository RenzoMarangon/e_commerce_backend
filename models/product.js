const { Schema, model } = require('mongoose');


const ProductSchema = Schema({
    name:{
        type: String,
        required: [true,'Name required'],
        unique:true,
    },
    price:{
        type:Number,
        required: [true,'Description required'],
        default: 0,
    },
    description:{
        type: String,
        required: [true,'Description required']
    },
    img:{
        type: String
    },
    category:{
        type: String,
        required: [true,'Category required']
    },
    stock:{
        type:Number
    },
    likes:{
        type:Number
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    enable:{
        type:Boolean,
        default:true,
    },
    state:{
        type:Boolean,
        default:true,
        required:true
    }
});


ProductSchema.methods.toJSON = function(){
    const { __v, _id, ...product } = this.toObject();
    product.uid = _id;
    return product;

}

module.exports = model('Product', ProductSchema);
