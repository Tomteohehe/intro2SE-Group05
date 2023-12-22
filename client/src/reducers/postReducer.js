export const postReducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'POSTS_LOADED_SUCCESS':
            return {
                ...state,
                posts: payload,
                postsLoading: false
            }
         case 'ALL':
            return {
                ...state,
                allposts: payload,
                postsLoading: false
            }
        /*
        case 'ADD_POST':
            return {
				...state,
                post: payload,
                postsLoading: false
			}
        */
        case 'DETAIL_POST':
            return {
				...state,
				detailpost: payload,
                postsLoading: false
			}
        case 'LARGEST_POST':
            return {
				...state,
				lastpost: payload,
                postsLoading: false
			}
        case 'NEWEST_POST':
            return {
				...state,
				smalllastposts: payload,
                postsLoading: false
			}
        default:
            return state
    }
}