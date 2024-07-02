const encrypter  = require('../utils/Encrypt');
const jwtUtils = require('../utils/jwt')
const UserDAO = require('../dataAccess/userDAO');
const AppError = require('../utils/AppError');

class UserController {
    
    static async authenticateUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserDAO.getUserByEmail(email);
            if (!user) {
                return res.status(401).json("Incorrect email or password");
            }
            
            const decryptedPassword = encrypter.decrypt(user.password);
            if (decryptedPassword === password) {
                const userData = { id: user._id, name: user.name, email: user.email, photo: user.photo };
                const token = jwtUtils.generateToken(userData);
                return res.status(200).json({ token });
            } else {
                return res.status(401).json("Incorrect email or password");
            }
        } catch (error) {
            next(new AppError("Error authorizing user", 500));
        }
    }

    static async createUser(req, res, next) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return next(new AppError('Name, email, and password fields are required', 400));
            }

            const userData = req.body;
            userData.password = encrypter.encrypt(userData.password);
            //const photo = req.file;
            const user = await UserDAO.createUser(userData);
            res.status(201).json(user);
        } catch (error) {
            next(new AppError('Error creating user', 500));
        }
    }

    static async getUserById(req, res, next) {
        try {
            const id = req.params.id;
            const user = await UserDAO.getUserById(id);
            if (!user) {
                return next(new AppError('User not found', 404));
            }
            user.password = encrypter.decrypt(user.password);
            res.status(200).json(user);
        } catch (error) {
            next(new AppError("Error retrieving user", 500));
        }
    }

    static async getUserProfileById(req, res, next) {
        try {
            const id = req.params.id;
            const user = await UserDAO.getProfileUserById(id);
            if (!user) {
                return next(new AppError('User not found', 404));
            }
            res.status(200).json(user);
        } catch (error) {
            next(new AppError("Error retrieving user profile", 500));
        }
    }

    static async getUserByName(req, res, next) {
        try {
            const name = req.query.name;
            const user = await UserDAO.getUserByName(name);
            if (!user) {
                return next(new AppError('User not found', 404));
            }
            res.status(200).json(user);
        } catch (error) {
            next(new AppError('Error retrieving user by name', 500));
        }
    }

    static async updateUser(req, res, next) {
        try {
            const id = req.params.id;
            const existingUser = await UserDAO.getUserById(id);
            if (!existingUser) {
                return next(new AppError('User not found', 404));
            }

            const userData = req.body;
            if (userData.password) {
                userData.password = encrypter.encrypt(userData.password);
            }

            const user = await UserDAO.updateUser(id, userData);
            if (!user) {
                return next(new AppError('User not found', 404));
            }
            res.status(200).json(user);
        } catch (error) {
            next(new AppError('Error updating user', 500));
        }
    }

    static async deleteUserById(req, res, next) {
        try {
            const id = req.params.id;
            const existingUser = await UserDAO.getUserById(id);
            if (!existingUser) {
                return next(new AppError('User not found', 404));
            }

            await UserDAO.deleteUserById(id);
            res.status(200).json("User successfully deleted");
        } catch (error) {
            next(new AppError('Error deleting user', 500));
        }
    }
}

module.exports = UserController;
