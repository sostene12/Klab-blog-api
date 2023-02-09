import mongoose from "mongoose";

const estateSchema = mongoose.Schema({
    location:{
        province:{type:String},
        district:{type:String},
        street:{type:String}
    },
    image:{
        type:Array,
        default:[]
    },
    price:{type:String},
    beds:{type:Number},
    bath:{type:Number},
    yearBuilt:{type:Number},
    lotSize:{type:String},
    status:{type:String},
    description:{type:String}
},{timestamps:true});

const Estate = mongoose.model('Estate',estateSchema);

export default Estate;

// Location: { province: string, District: string, street: string}
// Price: string
// Images: [array]
// Beds: number
// Bath: number
// Year built: number
// Lot size: string
// Status: string
// Description: String
// Timestamps
