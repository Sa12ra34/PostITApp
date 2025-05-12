import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import { likePost } from "../Features/PostSlice";


const initialState = {
    posts: [],
    comments: [],
    likes: [],
};

const postSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        
    builder
        .addCase(savePost.pending, (state) => {
        state.status = "loading";
    })
        .addCase(savePost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        // Update the state with fetched posts adding the latest post in the beginning
        state.posts.unshift(action.payload);
    })
        .addCase(savePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    })
        
        .addCase(getPosts.pending, (state) => {
            state.status = "loading";
    })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.status = "succeeded";
            console.log(action.payload);
        // Update the state with fetched posts adding the latest post in the beginning
            state.posts = action.payload;
    })
        .addCase(getPosts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
    })
    .addCase(likePost.pending, (state) => {
        state.status = "loading";
    })
    .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        //Search the post id from the posts state
        const updatedPostIndex = state.posts.findIndex(
            (post) => post._id === action.payload._id
        );
        if (updatedPostIndex !== -1) {
            state.posts[updatedPostIndex].likes = action.payload.likes;
            }
        })
        .addCase(likePost.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },

});




export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
    try {
        const response = await axios.post(`https://postitapp-server-ql42.onrender.com/savePost`, {
            postMsg: postData.postMsg,
            email: postData.email,
        });
        const post = response.data.post;
            return post; 
}           catch (error) {
    console.log(error);
    }
});  


export const getPosts = createAsyncThunk("post/getPosts", async () => {
    try {
        const response = await axios.get(`https://postitapp-server-ql42.onrender.com/getPosts`);
        return response.data.posts;
        console.log(response);
    } catch (error) {
    console.log(error);
    }
}); 


export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
try {
    //Pass along the URL the postId
    const response = await axios.put(
        `https://postitapp-server-ql42.onrender.com/likePost/${postData.postId}`,
        {
        userId: postData.userId,
        }
    );
    const post = response.data.post;
    return post;
} catch (error) {
    console.log(error);
}
});


export default postSlice.reducer;



