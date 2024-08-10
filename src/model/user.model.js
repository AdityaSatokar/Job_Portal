export default class User{

    constructor(id,name,email,password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static createUser(name,email,password){
        const id = Date.now();;
        const user = new User(id,name,email,password);
        users.push(user);
        console.log(users);
    }

    static checkUser(email,password){
        const user = users.find((user)=>{
            return user.email === email && user.password === password
        })
        return user;
    }
}

let users = [
    new User(1710692475394,
        "Aditya Satokar",
        "adityasatokar@gmail.com",
        "1234"
        )
];