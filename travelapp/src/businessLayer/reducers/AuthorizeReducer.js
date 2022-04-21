const initialState = {
    isAuthorized: false,
};

export const authorizeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTHORIZE':
            return { ...state, isAuthorized: action.payload };
        default:
            return state;
    }
};