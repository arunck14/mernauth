import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs' ;
import { errorHandler } from "../utils/error.js";
import jwt  from "jsonwebtoken";
const JWT_SC = 'authcontabcdegfsfdsldkfjsld';
export const signup = async (req,res,next) =>{
    // res.json({
    //     message: " api called successfully from auth controller"
    // });

    console.log(req.body);
    const { username, email , password } = req.body;
    const hashedPassword = await bcryptjs.hashSync(password,10);
    const newUser = new User({username, email , password :hashedPassword });
    try{
          await newUser.save();
   res.status(201).json({message : "user created successfully"});
    }
    catch(error){
        // res.status(500).json(error.message); 
        // next(errorHandler(300,"something went wrong"));  
        next(error);
    }
  
};
export const signin = async (req,res,next) =>{
    // res.json({
    //     message: " api called successfully from auth controller"
    // });

   const {email,password} =req.body;
   try {
    const validUser = await User.findOne({email});
    if(!validUser) return next(errorHandler(401,'User not found'));
    const validPassword  = bcryptjs.compareSync(password,validUser.password);
    if(!validPassword ) return next(errorHandler(401 , 'wrong credentials'));
    const token = jwt.sign({id:validUser._id},JWT_SC); //for saftery ,use in proccess.inv
   
    const {password:hashedPassword, ...rest} =validUser._doc;  //add _doc to distructure properly,this step is used to remove password in json when api is called
    const expiryDate = new Date(Date.now()+360000) ; //1 hour expiry for cookie

    res.cookie('access_token',token, {httpOnly:true,expires:expiryDate}).status(200).json(rest); //to set cookie; rest is passed for saftey to remove password
   } catch (error) {
    next(error);
   }
  
};