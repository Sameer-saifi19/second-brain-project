"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const middleware_1 = require("./middleware");
const JWT_USER_PASSWORD = "Sameer123";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredbody = zod_1.z.object({
        username: zod_1.z.string().min(3).max(10),
        password: zod_1.z.string().min(8).max(20).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/)
    });
    const safeParsedData = requiredbody.safeParse(req.body);
    if (!safeParsedData.success) {
        res.json({
            message: "Incorrect Input format",
            error: safeParsedData.error
        });
        return;
    }
    const { username, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    try {
        yield db_1.userModel.create({
            username: username,
            password: hashedPassword
        });
        res.json({
            message: "Sign up successful"
        });
    }
    catch (error) {
        res.json({
            message: "user already exists"
        });
    }
}));
app.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredbody = zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string()
    });
    const safeParsedData = requiredbody.safeParse(req.body);
    if (!safeParsedData.success) {
        res.json({
            message: "Incorrect Input Format",
            error: safeParsedData.error
        });
        return;
    }
    const { username, password } = req.body;
    try {
        const user = yield db_1.userModel.findOne({ username });
        if (!user) {
            res.status(401).json({ message: "User not found or wrong email" });
            return;
        }
        const isPasswordCorrect = bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Incorrect Email or password" });
            return;
        }
        else {
            const token = jsonwebtoken_1.default.sign({
                id: user._id,
            }, JWT_USER_PASSWORD);
            res.json({
                token: token,
                message: "sign in successful"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}));
app.post('/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type } = req.body;
    yield db_1.contentModel.create({
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
}));
app.get('/your-content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.contentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete('/delete', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Content Deleted"
    });
}));
app.post('/brain/share', (req, res) => {
    res.send("Share");
});
app.get('/brain/:sharelink', (req, res) => {
});
app.listen(3000);
