import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from 'jsonwebtoken'



const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

// routes for user login
const loginUser = async (req, res) => {
   
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success:false, message: "User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({success:true, token});
        } else {
            res.json({success:false, message: "Invalid credentials"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }


};

// routes for register user

//Route for user Registration
const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body;
        //Checking user already exists or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message: "User already exists"})
        }
        //Validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Please enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message: "Please enter a strong password"})
        }
        //Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success: true, token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// routes for admin login
const adminLogin = async (req, res) => {
     try {
        console.log('adminLogin body:', req.body)
        const {email,password} = req.body || {}

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required', body: req.body })
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                const token = jwt.sign(email+password, process.env.JWT_SECRET)
                return res.json({success:true,token})
        }

        return res.status(401).json({ success: false, message: 'Invalid admin credentials' })

     } catch (error) {
         console.log(error);
         res.json({success:false, message:error.message});
     }

};

export { loginUser, registerUser, adminLogin };
