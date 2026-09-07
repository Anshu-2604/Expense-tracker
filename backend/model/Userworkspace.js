const mongoose=require("mongoose")
const workspaceItemSchema =  mongoose.Schema({
  name:String,
  content: {
    type:Object,
    default:{}
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
module.exports=mongoose.model("Item",workspaceItemSchema)