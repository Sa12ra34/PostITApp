import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { 
  services: [],
    posts: [],
    likes: [],
};


const ServicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(saveService.pending, (state) => {
            state.status = "loading";
          })
          .addCase(saveService.fulfilled, (state, action) => {
            console.log(action.payload);
            state.status = "succeeded";
            // Update the state with fetched posts adding the latest post in the beginning
            state.posts.unshift(action.payload);
          })
          .addCase(saveService.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
    
          .addCase(getServices.pending, (state) => {
            state.status = "loading";
          })
          .addCase(getServices.fulfilled, (state, action) => {
            state.status = "succeeded";
            // Update the state with fetched posts
            console.log(action.payload);
            state.posts = action.payload;
          })
          .addCase(getServices.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
          
    
    },
});

// Thunks for Services
export const saveService = createAsyncThunk("services/saveService", async (serviceData) => {
    try {
        const response = await axios.post('http://localhost:3001/saveService', {
            serviceName:serviceData.serviceName ,
            date:serviceData.date ,
            seatsAvailable:serviceData.seatsAvailable ,
            email:serviceData.email ,

        
        });
        return response.data.services; // Return the service to Redux
    } catch (error) {
        console.log(error);
    }
});

export const getServices = createAsyncThunk("services/getServices", async () => {
    try {
        const response = await axios.get("http://localhost:3001/getServices");
        return response.data.services;
    } catch (error) {
        console.log(error);
    }
});
export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
try {
    //Pass along the URL the postId
    const response = await axios.put(
        `http://localhost:3001/likePost/${postData.postId}`,
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




export default ServicesSlice.reducer;
