import { compare } from "bcrypt"
import { hashpassword } from "../helpers/authhelper.js"
import usermodels from "../models/usermodels.js"
import JWT from "jsonwebtoken"
export const registerController = async (req, res) => {
   
    try {
        const { name, email, password, phone, address , question , role } = req.body
        
        // validation
        if (!name) {
            return res.send({ message: "Name is Required" })
        }
        if (!email) {
            return res.send({ message: "Email is Required" })
        }
        if (!password) {
            return res.send({ message: "Password is Required" })
        }
        if (!address) {
            return res.send({ message: "Address is Required" })
        }
        if (!phone) {
            return res.send({ message: "Phone is Required" })
        }
        if (!question) {
            return res.send({ message: "question is Required" })
        }
         if(!role){
            return res.send({error:"role is Required"})
        }
        
       

        // Checkuser

        const currentUser = await usermodels.findOne({ email });

        // Existing user

        if (currentUser) {
            return res.status(200).send({
                success: true,
                message: 'Already registered. Please login.',
            });
        }

        // registered User
        const hashedPassword = await hashpassword(password);

        //Save

        const user = await new usermodels({
            name,
            email,
            address,
            phone,
            password: hashedPassword,
            role,
            question
        }).save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully.',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while registering the user.',
            error,
        });
    }
}


// Login

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "required Email"
            })
        }
        // Checkuser

        const user = await usermodels.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not Registered"
            })
        }

        // Match Password

        const match = compare(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Password is Not Match"
            })
        }

        // Token Create

        const token = JWT.sign({ _id: user._id }, process.env.JWT_Secret, { expiresIn: '5d' });
        res.status(200).send({
            success: true,
            message: 'You are Login Successfully',
            user: {
                _id:user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role:user.role
            },
            token,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Occured',
            error
        })
    }
}


// Forget Controller

export const forgetController = async (req, res) => {
    try {
       const {email,newpassword,question} = req.body
       if(!email){
        res.status(400).send({
            
            message: 'Email is Required'
        })
       }
       if(!newpassword){
        res.status(400).send({
            
            message: 'newpassword is Required'
        })
       }
       if(!question){
        res.status(400).send({
            
            message: 'question is Required'
        })
       }
        // Checkuser

        const Cuser = await usermodels.findOne({ email,question });

        // Existing user

        if (!Cuser) {
            return res.status(404).send({
                success: false,
                message: 'wrong Email and question',
            });
        }
        const hasshed = await hashpassword(newpassword) 
        await usermodels.findByIdAndUpdate(Cuser._id,{password:hasshed});
        res.status(200).send({
            success: true,
            message: 'Password Successfully Reset',
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Something went wrong',
            error
        })
    }

}


// Test Controller

export const testController = (req, res) => {
    try {
        res.send('Protected Routes')
    } catch (error) {
        console.log(error);
        res.send({ error })
    }

}


