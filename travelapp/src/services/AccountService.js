class AccountService {

    checkSignInUser(userName, password) {
        let data = {
            Name: userName,
            Password: password,
        };

        return fetch('api/users/CheckUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(
                (result) => {
                    return result;
                },
                (error) => {
                    console.log(error);
                    return false;
                }
            );
    }

    addUser(user) {
        let data = {
            Name: user.name,
            Email: user.email,
            Password: user.password,
            Status: user.status
        };
        return fetch('api/users/AddUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(
                (result) => {
                    return result;
                },
                (error) => {
                    console.log(error);
                    return false;
                }
            );
    };
}

export default AccountService;