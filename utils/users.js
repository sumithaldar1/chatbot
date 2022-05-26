const users=[];

//Join user to chat

function userjoin(id,username,room){
    const user={id,username,room};
    users.push(user);
    return user;

}

//Get Current User

function getuser(id){
    return users.find(user =>user.id === id);
}

module.exports={
    userjoin,
    getuser
};