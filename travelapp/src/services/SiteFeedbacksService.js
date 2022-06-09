export const getSiteFeedbacks = async () => {

    return fetch('/api/sitefeedbacks/GetFeedbacks', {
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

export const addSiteFeedback = async (feedback) => {

    return fetch(`/api/sitefeedbacks/AddFeedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedback)
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
