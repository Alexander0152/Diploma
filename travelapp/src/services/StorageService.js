class StorageService {

    getUser(){
        return localStorage.getItem('user');
    }

    setUser(user){
        localStorage.setItem('user', JSON.stringify(user));
    }

    removeUser(user){
        localStorage.removeItem('user');
    }
}

export default StorageService;