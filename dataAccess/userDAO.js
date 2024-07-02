const User = require('../models/User')

class UserDAO {
    constructor() {

    }

    async createUser(UserData) {
        try {
            const user = new User(UserData);
            const newUser = await user.save();
            return newUser;
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getUserById(id) {
        try {
            return await User.findById(id)
        } catch (error) {
            throw error
        }
    }

    
    async getProfileUserPorId(id) {
        try {
            const User = await User.findById(id,{password:0})
            return User
        } catch (error) {
            throw error
        }
    }

    async getUserByName(searchName) {
        try {
            return await User.findOne({ name: searchName },{ password: 0 })
        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(searchEmail) {
        try {
            return await User.findOne({ email: searchEmail })
        } catch (error) {
            throw error
        }
    }

    async updateUser(id, UserId) {
        try {
            return await User.findByIdAndUpdate(id, UserId, { new: true })
        } catch (error) {
            throw error;
        }
    }
    async deleteUserById(id) {
        try {
            return await User.findOneAndDelete({ _id: id })
        } catch (error) {
            throw error;
        }
    }

}
module.exports = new UserDAO()