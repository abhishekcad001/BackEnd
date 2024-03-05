const {Schema,model}=require("mongoose")

const listerSchema = new Schema({

})

const ListerModel=new model("lister",listerSchema)

module.exports=ListerModel