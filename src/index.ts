import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { string, z } from 'zod';
import bcrypt, { hash } from 'bcrypt';
import express from 'express';
import { contentModel, userModel } from '../db';
import { userMiddleware } from './middleware';
const JWT_USER_PASSWORD = "Sameer123"

const app = express();
app.use(express.json())

app.post('/signup',async (req,res) => {
    
    const requiredbody = z.object({
        username: z.string().min(3).max(10),
        password: z.string().min(8).max(20).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/)
    })

    const safeParsedData = requiredbody.safeParse(req.body)

    if(!safeParsedData.success){
        res.json({
            message:"Incorrect Input format",
            error: safeParsedData.error
        })
        return;
    }

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password,5)

    try {
        await userModel.create({
            username:username,
            password:hashedPassword
        })
        res.json({
            message:"Sign up successful"
        })
    } catch (error) {
        res.json({
            message:"user already exists"
        })
    }
})

app.post('/signin', async (req,res) => {
    const requiredbody = z.object({
        username: z.string(),
        password: z.string()
    })

    const safeParsedData = requiredbody.safeParse(req.body);

    if (!safeParsedData.success){
        res.json({
            message:"Incorrect Input Format",
            error: safeParsedData.error
        });
        return;
    }

    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            res.status(401).json({ message: "User not found or wrong email" });
            return;
        }


        const isPasswordCorrect = bcrypt.compare(password, user.password as string);

        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Incorrect Email or password" });
            return;
        }else{
            const token = jwt.sign({
                id: user._id,
            },JWT_USER_PASSWORD);
    
            res.json({
                token:token,
                message: "sign in successful"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

app.post('/content',userMiddleware, async (req,res) => {
    const { link, type } = req.body;
    await contentModel.create({
        link,
        type,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })

    res.json({
        message:"Content added"
    })
})


app.get('/your-content',async (req,res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId: userId
    }).populate("userId","username")
    res.json({
        content
    })
})

app.delete('/delete',userMiddleware,async (req,res) => {

    const contentId = req.body.contentId;
    await contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message:"Content Deleted"
    })
})

app.post('/brain/share', (req,res) =>{
    res.send("Share")
})

app.get('/brain/:sharelink', (req,res) =>{

})

app.listen(3000)