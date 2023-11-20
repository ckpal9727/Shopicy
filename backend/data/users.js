import bcrypt from 'bcrypt'

const user=[
    {
        name:'Admin User',
        email:'admin@email.com',
        password:bcrypt.hashSync('12',10),
        isAdmin:true,
    },
    {
        name:'ck',
        email:'ck@email.com',
        password:bcrypt.hashSync('12',10),
        isAdmin:false,
    },
    {
        name:'kp',
        email:'kp@email.com',
        password:bcrypt.hashSync('12',10),
        isAdmin:false,
    },
]

export default user;