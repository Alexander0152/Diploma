class AccountService {

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