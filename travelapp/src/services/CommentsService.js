export const getComments = async (countryId) => {
    if (!countryId) return;

    return fetch(`/api/feedbacks/GetFeedbacks?countryId=${countryId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
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
};

export const createComment = async (text, parentId = null, countryId, user) => {

    const data = {
        ParentId: parentId,
        UserId: user.id,
        CountryId: countryId,
        FeedbackText: text,
        Date: new Date().toISOString()
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
};

export const updateComment = async (commentId, newText) => {
    return fetch(`/api/feedbacks/UpdateFeedback?commentId=${commentId}&text=${newText}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
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
};

export const deleteComment = async (feedbackId) => {
    return fetch(`/api/feedbacks/${feedbackId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
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
};
