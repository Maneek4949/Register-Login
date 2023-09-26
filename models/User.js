import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    tokens:[{
      token:{
        type:String,
        required:true,
      }
    }]
  }
);

UserSchema.methods.generateAuthToken = async function(){
  try{
    const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({token})
    await this.save();
    return token

  }
  catch (error){
    res.send("the error "+error)
    console.log("the error "+error)

  }
}

const User = mongoose.model("User", UserSchema);

export default User;