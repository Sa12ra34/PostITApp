import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Model/UserModel.js";
import bcrypt from "bcrypt";
import PostModel from "./Model/Posts.js";
import multer from "multer";
import fs from "fs";
import path from "path";



const app= express();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});
  // Create multer instance
const upload = multer({ storage: storage }); 


const connectionstring ="mongodb+srv://alwrwdw942:admin123@postitcluster.2qwmu.mongodb.net/postITDb?retryWrites=true&w=majority&appName=PostITCluster";
mongoose.connect(connectionstring);
app.post("/registerUser",async(req,res)=>{
    try{
        const name =req.body.name;
        const email=req.body.email;
        const password=req.body.password;
        const hashedpassword =await bcrypt.hash(password,10);

        const user =new UserModel({
            name:name,
            email:email,
            password:hashedpassword,
        });
        await user.save();
        res.send({user:user,msg:"Added."});
    }catch(error){
        res.status(500).json({error:"An error occurred"});
    }
});
app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user =await UserModel.findOne({ email:email});
        if(!user){
            return res.status(500).json({ error: "User not found."});

                }
    console.log(user);
    const passwordMatch =await bcrypt.compare(password,user.password);
    if (!passwordMatch){
        return res.status(401).json({error:"Authentication failed"});
    }
    res.status(200).json({user,message: "Success"});
}catch(err){
    res.status(500).json({error:err.message});
}
})
app.post("/logout",async (req,res)=>{
    res.status(200).json({ message: "Logged out successfully"});
});

app.post("/savePost", async (req, res) => {
    try {
        const postMsg = req.body.postMsg;
        const email = req.body.email;

        const post = new PostModel({
            postMsg: postMsg,
            email: email,
        });
        
        await post.save();
        res.send({ post: post, msg: "Added." });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});
app.get("/getPosts", async (req, res) => {
    try {
        const posts = await PostModel.find({}).sort({ createdAt: -1 });

        const countPost = await PostModel.countDocuments({});
        
        res.send({ posts: posts, count: countPost });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
    }
});

app.put("/likePost/:postId/", async (req, res) => {
    const postId = req.params.postId;
    const userId = req.body.userId;
    
    
    try {
        
        const postToUpdate = await PostModel.findOne({ _id: postId });

        if (!postToUpdate) {
            return res.status(404).json({ msg: "Post not found." });
        }

        const userIndex = postToUpdate.likes.users.indexOf(userId);

        if (userIndex !== -1) {
        
        const udpatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            {
                $inc: { "likes.count": -1 }, // Decrement the like count $inc and $pull are update operators
                $pull: { "likes.users": userId }, // Remove userId from the users array
            },
            { new: true } 
        );

        res.json({ post: udpatedPost, msg: "Post unliked." });
        } else {
    
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            {
            $inc: { "likes.count": 1 }, // Increment the like count
            $addToSet: { "likes.users": userId }, // Add userId to the users array if not already present
        },
          { new: true } // Return the modified document
        );

        res.json({ post: updatedPost, msg: "Post liked." });
}
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
}
});

app.put("/updateUserProfile/: email/",
    upload.single("profilePic"), 
    async (req, res) => {
    //Retrieve the value from the route
    
    const email= req.params.email;

    const name = req.body.name;
    const password = req.body.password;


    try {
        const userToUpdate = await UserModel.findOne({ email: email });

    // Check if the user was found
    if (!userToUpdate) {
        return res.status(404).json({ error: "User not found" });
    }
          // Check if a file was uploaded and get the filename
    let profilePic = null;
    if (req.file) {
        profilePic = req.file.filename; // Filename of uploaded file
            // Update profile picture if a new one was uploaded but delete first the old image
        if (userToUpdate.profilePic) {
            const oldFilePath = path.join(
            __dirname,
            "uploads",
            userToUpdate.profilePic
        );
        fs.unlink(oldFilePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("Old file deleted successfully");
            }
        });
        userToUpdate.profilePic = profilePic; // Set new profile picture path
        }
        } else {
            console.log("No file uploaded");
        }
    
    userToUpdate.name = name;


    if (password !== userToUpdate.password) {
        const hashedpassword = await bcrypt.hash(password, 10);
        userToUpdate.password = hashedpassword;
    } else {

        userToUpdate.password = password;
    }

    await userToUpdate.save(); 

    res.send({ user: userToUpdate, msg: "Updated." });



    } catch (err) {
        res.status(500).json({ error: err });
        return;
    }
});
    


    


app.listen(3001,()=>{
    console.log("you are connected");
});