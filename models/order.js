const { Schema, model } = require('mongoose');


const OrderSchema = Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    products:{
        type:Array,
        required:[true, 'Products required']
    }
})


OrderSchema.methods.toJSON = function(){
    const { __v, _id, ...order } = this.toObject();
    order.uid = _id;
    return order;

}

module.exports = model('Order', OrderSchema );