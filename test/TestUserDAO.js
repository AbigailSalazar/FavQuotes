const User = require('../entities/User');
const db = require('../config/db');
const UserDAO = require('../dataAccess/userDAO');

async function main() {
    await db.connect().then(() => {
        console.log('Connection successful');
    }).catch((err) => {
        console.log(err);
    });

    // Tests

    // Create
    await UserDAO.createUser(new User("Sandra Lopez", "maria@gmail.com", "123456", "photo1.jpg")).then(userSaved => {
        console.log('User created successfully', userSaved);
    }).catch(err => {
        console.log('Error creating user', err);
    });

    await UserDAO.createUser(new User("Jesus Ruiz", "jorge@gmail.com", "123456", "photo2.jpg")).then(userSaved => {
        console.log('User created successfully', userSaved);
    }).catch(err => {
        console.log('Error creating user', err);
    });

    await UserDAO.createUser(new User("Maria Hernandez", "paola@gmail.com", "123456", "photo3.jpg")).then(userSaved => {
        console.log('User created successfully', userSaved);
    }).catch(err => {
        console.log('Error creating user', err);
    });

    // Read
    console.log('Retrieving user by name - Maria Hernandez...');
    let userByName = await UserDAO.getUserByName('Maria Hernandez');
    console.log(userByName);

    console.log('Retrieving user by ID...');
    let userById = await UserDAO.getUserById(userByName._id);
    console.log(userById);

    

    console.log('Retrieving user by email - maria@gmail.com...');
    let userByEmail = await UserDAO.getUserByEmail('maria@gmail.com');
    console.log(userByEmail);

    // Update
    console.log('Updating user Jesus Ruiz...');
    userByName = await UserDAO.getUserByName("Jesus Ruiz");
    const updatedUserData = new User("Jesus Ruiz", "jesus.ruiz@gmail.com", "123456", "photo4.jpg");
    let updatedUser = await UserDAO.updateUser(userByName._id, updatedUserData);
    console.log(updatedUser);

    // Delete
    console.log('Deleting user by ID...');
    let userToDelete = await UserDAO.getUserByName('Jesus Ruiz');
    let deletedUser = await UserDAO.deleteUserById(userToDelete._id);
    console.log('User deleted successfully', deletedUser);

    userToDelete = await UserDAO.getUserByName('Maria Hernandez');
    deletedUser = await UserDAO.deleteUserById(userToDelete._id);
    console.log('User deleted successfully', deletedUser);

    userToDelete = await UserDAO.getUserByName('Sandra Lopez');
    deletedUser = await UserDAO.deleteUserById(userToDelete._id);
    console.log('User deleted successfully', deletedUser);

    // Create
    await UserDAO.createUser(new User("Test", "test@gmail.com", "123456", "test.jpg")).then(userSaved => {
        console.log('User created successfully', userSaved);
    }).catch(err => {
        console.log('Error creating user', err);
    });

    await db.disconnect().then(() => {
        console.log('Disconnection successful');
    }).catch((err) => {
        console.log(err);
    });
}

main();
