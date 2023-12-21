export const authReducer = (state, action) => {
	const { type, payload: { alluser, isAuthenticated, user }} = action

	switch (type) {
		case 'SET_AUTH':
			return {
				...state,
				authLoading: false,
				isAuthenticated,
				user
			}
		case 'ALL_USER':
            return {
				...state,
				alluser
			}

		default:
			return state
	}
}