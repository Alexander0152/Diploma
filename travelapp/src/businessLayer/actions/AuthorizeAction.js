export const changeIsAuthorize = (isAuthorized, user = {}) => ({
    type: 'AUTHORIZE',
    payload: {
        isAuthorized: isAuthorized,
        user: user
    },
});