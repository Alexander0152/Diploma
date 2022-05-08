export const getComments = async () => {
    return [
        {
            id: 1,
            body: "First comment",
            username: "Jack",
            userId: 1,
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: 2,
            body: "Second comment",
            username: "John",
            userId: 2,
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: 3,
            body: "First comment first child",
            username: "John",
            userId: 2,
            parentId: 1,
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: 4,
            body: "Second comment second child",
            username: "John",
            userId: 2,
            parentId: 2,
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
    ];
};

export const createComment = async (text, parentId = null, countryId, user) => {

    const data = {
        Id: null,
        ParentId: parentId,
        UserId: user.id,
        CountryId: countryId,
        FeedbackText: text,
        // Date:  new Date().toISOString()
    };

    return fetch(`/api/feedbacks/AddFeedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.log(error);
            }
        );
    // return {
    //     id: Math.random().toString(36).substr(2, 9),
    //     body: text,
    //     parentId,
    //     userId: user.id,
    //     username: user.name,
    //     createdAt: new Date().toISOString(),
    // };
};

export const updateComment = async (text) => {
    return {text};
};

export const deleteComment = async () => {
    return {};
};
