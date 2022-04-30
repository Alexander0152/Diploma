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
                    return !!result;
                },
                (error) => {
                    console.log(error);
                    return false;
                }
            );
    }

    addUser(user) {
        // event.preventDefault();
        try {
            let data = {
                Name: user.name,
                Email: user.email,
                Password: user.password,
                Status: user.status
            };
            fetch('api/users/AddUser', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

        } catch (e) {
            // this.setState({
            //     message: 'Such user already exist!',
            // })
        }
        // this.setState({
        //     message: 'You loged in successfully!',
        // })
    };
}

export default AccountService;