import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { random } from "./utils";
import bcrypt, { hash } from 'bcrypt';
import express from 'express';
import { contentModel, userModel, linkModel } from '../db';
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

app.post('/create-content',userMiddleware, async (req,res) => {
    const { link, title } = req.body;
    await contentModel.create({
        title,
        link,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })

    res.json({
        message:"Content added"
    })
})

app.get('/your-content',userMiddleware, async (req,res) => {
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

app.post('/brain/share',userMiddleware, async (req,res) =>{
    const share = req.body.share;
    if (share) {
            const existingLink = await linkModel.findOne({
                // @ts-ignore
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await linkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/brain/:shareLink",userMiddleware, async (req, res) => {
    const hash = req.params.shareLink;

    const link = await linkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    
    const content = await contentModel.find({
        userId: link.userId
    })

    const user = await userModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(3000)