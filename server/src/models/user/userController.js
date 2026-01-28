import userModel from "./userModel.js";
import bcrypt from "bcrypt";
import User from "./userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { SECRET_KEY } = process.env;
//userAdd or signup  same thing..
class UserController {

    //add user/ signup
    async signup(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password required' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userModel.create({
                email, password: hashedPassword,
            });
            res.status(201).json({
                id: user.id,
                email: user.email,
            })
        } catch (err) {
            res.json({ message: err.message })
        }
    }
    //login route
   async login(req, res) {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }
        
        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            // FIXED: Return error if password wrong
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        // FIXED: If we reach here, password is correct
        const token = jwt.sign(
            { id: user.id, email: user.email }, // FIXED: lowercase 'user'
            SECRET_KEY,
            { expiresIn: '24h' } // Optional: token expires in 24 hours
        );
        
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
        
    } catch (err) {
        // FIXED: 500 for server errors, not 201
        res.status(500).json({ message: err.message });
    }
}

//get the user detail
 async getUser (req,res){
        const user_id= req.user.id;
        try{
            if(user_id){
                const data =await userModel.findAll();
                return res.json(data);
            }
            else{
                res.json("Failed to load the data");
            }
        }catch(err){
            res.json({message:err.message});
        }
    }   

};
export default UserController;


