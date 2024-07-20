import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    companyname:{
        type: String,
        required: true,
    },
    regularPrice:{
        type: Number,
        required: true,
    },
    discountedPrice:{
        type: Number,
        required: true,
    },
    quantity:
    {
        type: Number,
        required: true,
    },
    rating:{
        type: Number,
        required: false,
    
    },
    ready:{
        type: Boolean,
        required: true,
    },
    checked:{
        type: Boolean,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    offer:{
        type:Boolean,
        required: true,
    },
    imageUrls :{
        type: Array,
        required: true, 
    },
    userRef:{
        type:String,
        required:true,
    },
},{
    timestamps:true
}
);

const Listing =mongoose.model('Listing', listingSchema);
export default Listing;