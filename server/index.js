const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');
const users= [{id: 1, username: 'Misha', age: 23}];

const app = express();
app.use(cors());

const createUser = (input) => {
    const id= Date.now()
    return {
        id,...input
    }
}

const root = {
    getAllUsers: () => {
        return users
    },
    getUser:({id}) => {
        return users.find(user => user.id === id)

    },
    createUser: ({input})=> {
        const  user= createUser(input)
        users.push(user)
        return user
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(8086, ()=> console.log('Server started on port', 8086))
