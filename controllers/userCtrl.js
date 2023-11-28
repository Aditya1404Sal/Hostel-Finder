const userModel = require('../models/userModel');
const hostelModel = require('../models/hostelModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const LoginController = async (req,res) => {
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user){//check for user
            return res.status(200).send({message:'User Does not Exist'});   
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password)//user entered password is compared with decrypted hashed password from db
        if(!isMatch){
            return res.status(200).send({message:'invalid email or password'});
        }
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).send({
            message:'Login successful',
            success:true,token,
            UserId:user.id
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({message:`Login Controller ${error.message}`})
    }


} 


const authController = async(req,res) => {
    try {
        const user = await userModel.findById({_id:req.body.userId});
        user.password = undefined;
        if(!user){
            return res.status(200).send({message:'user not found',success:false});
        }
        else{
            res.status(200).send({
                success:true,
                data:user
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'auth controller error',success:false})
    }
}

const RegisterController = async (req,res) => {
    try {
        const existingUser = await userModel.findOne({email:req.body.email}) 
        //searches the mongoDB database for email , to ensure that duplicate user does not exist.
        if(existingUser){
            return res.status(200).send({message:'user already exists',success:false})
        }
        const mobile_number = await userModel.findOne({mobile:req.body.mobile})
        if(mobile_number){
            return res.status(200).send({message:'Mobile Number already in use',success:false})
        }
        //password encryption 
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        //replacing entered password with encrypted password for security purposes
        const newUser = new userModel(req.body)
        newUser.user_id = newUser.id
        await newUser.save();
        res.status(200).send({
            message:'Registered successfully',
            success:true,
            UserId:newUser._id,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message:`Register Controller ${error.message}`})
    }

};

const HostelRegisterController = async(req,res) => {
    try {
        const existingHostel = await hostelModel.findOne( {$and: [
            {hostelName: req.body.hostelName},
            {pincode: req.body.pincode}
          ]});
        if(existingHostel){
            return res.status(200).send({
                message:"Hostel already registered in area",
                success:false
            })
        }
        const newHostel = new hostelModel(req.body)
        newHostel.hostel_id = newHostel.id
        await newHostel.save();
        res.status(200).send({
            message:'Registered Hostel successfully',
            success:true,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message:`Hostel Register Controller ${error.message}`})
    }
}

const HostelDetailPageController = async(req,res) => {
    try {
        const hostel = await hostelModel.findOne({owner_id:req.body.owner_id});
        res.status(200).send({
            success:true,
            message: "Hostel data found",
            data: hostel,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error:`${error} at GetHostelDetailCtrl`,
            success: false
        })
    }
};

const UpdateHostelController = async(req,res) => {
    try {
        const hostel = await hostelModel.findOneAndUpdate({owner_id:req.body.owner_id},req.body);
        hostel.save();
        res.status(200).send({
            success:true,
            message:"successfully updated hostel details",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error:`${error} at UpdateHostelCtrl`,
            success: false,
        });
    }
}

const HostelDataFetcher = async(req,res) =>{
    try {
        const hostel = await hostelModel.findOne({_id:req.body.hostel_id});
        res.status(200).send({
            message:"successfully fetched hostels data",
            success:true,
            data:hostel
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Error in fetching hostels data",
            success:false,
            error:`${error}`
        })
    }
}

const HostelRestrictedToPinCode = async(req,res) => {
    try {
        const SomeHostels = await hostelModel.find({pincode:req.body.pin});
        res.status(200).send({
            message:"Hostels for this pincode are found !! ",
            success:true,
            data:SomeHostels
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in getting hostels based on pincode",
            success: false,
            errpr: `${error}`
        })
    }
}








module.exports = {LoginController,RegisterController,authController,HostelRegisterController,HostelDetailPageController,UpdateHostelController,HostelDataFetcher,HostelRestrictedToPinCode};