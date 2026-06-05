const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String
    },
    brand:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:String
    },
    discountPrice:{
        type:Number
    },
    currency:{
        type:String
    },
    variants:[{
        size:{type:String},
        color:{type:String},
        stock:{type:Number},
    }],
    productImage:{
        type:String,
        default:'product-image'
    },
    tags:[{
        type:String
    }],
    status:{
        type:String,
        enum:['draft','active','archieved'],
        default:'draft'
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    ratings:{
        average:{
            type:Number,
            default:5
        },
        count:{
            type:Number,
            default:1
        },
    }
},{
    timestamps:true
});

const ProductModel = mongoose.model('mern-product-manage',ProductSchema)
module.exports = ProductModel