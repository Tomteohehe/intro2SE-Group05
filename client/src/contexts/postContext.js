import { createContext, useReducer } from "react";
import { postReducer } from '../reducers/postReducer';
import axios from "axios";

export const postContext = createContext()

const PostContextProvider = ({children}) => {
    // state 
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true,

    })

    // get all posts
    const getAllPosts = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/post')
            if(response.data.success) {
                dispatch({ type: 'POSTS_LOADED_SUCCESS', payload: response.data.posts })
            }
        }
        catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    // add post
    const addPost = async Post => {
		try {
			const response = await axios.post('http://localhost:5000/api/post', Post)
			if (response.data.success) {
				dispatch({ type: 'ADD_POST', payload: response.data.post })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}
    
    // post context data
    const postContextData = { postState, getAllPosts, addPost }

    return (
        <postContext.Provider value={postContextData}>
            {children}
        </postContext.Provider>
    )
}

export default PostContextProvider