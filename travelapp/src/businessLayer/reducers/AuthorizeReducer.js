const initialState = {
    isAuthorized: false,
    user: {
        id: null,
        name: null,
        email: null,
        status: null,
    }
};

export const authorizeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTHORIZE':
            return {...state, isAuthorized: action.payload.isAuthorized, user: action.payload.user};
        default:
            return state;
    }
};