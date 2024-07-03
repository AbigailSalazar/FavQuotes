const GroupDAO = require('../dataAccess/groupDAO');
const {AppError} = require('../utils/appError');

class GroupController {
    
    static async createGroup(req, res, next) {
        try {
            const { name} = req.body;
            if (!name) {
                return next(new AppError('Name is required', 400));
            }

            const groupData = req.body;
            const group = await GroupDAO.createGroup(groupData);
            res.status(201).json(group);
        } catch (error) {
            next(new AppError('Error creating group', 500));
        }
    }

    static async getGroupById(req, res, next) {
        try {
            const id = req.params.id;
            const group = await GroupDAO.getGroupById(id);
            if (!group) {
                return next(new AppError('Group not found', 404));
            }
            res.status(200).json(group);
        } catch (error) {
            next(new AppError("Error retrieving group", 500));
        }
    }

    static async getGroupsByName(req, res, next) {
        try {
            const name = req.params.name;
            const groups = await GroupDAO.getGroupsByName(name);
            if (!groups || groups.length === 0) {
                return next(new AppError('Group not found', 404));
            }
            res.status(200).json(groups);
        } catch (error) {
            next(new AppError('Error retrieving group by name', 500));
        }
    }

    static async updateGroup(req, res, next) {
        try {
            const id = req.params.id;
            const existingGroup = await GroupDAO.getGroupById(id);
            if (!existingGroup) {
                return next(new AppError('Group not found', 404));
            }

            const groupData = req.body;
            const group = await GroupDAO.updateGroup(id, groupData);
            if (!group) {
                return next(new AppError('Group not found', 404));
            }
            res.status(200).json(group);
        } catch (error) {
            next(new AppError('Error updating group', 500));
        }
    }

    static async addQuote(req, res, next) {
        try {
            const id = req.params.id;
            const existingGroup = await GroupDAO.getGroupById(id);
            if (!existingGroup) {
                return next(new AppError('Group not found', 404));
            }

            const quoteId = req.body.quote;
            const group = await GroupDAO.addQuote(id, quoteId);
            if (!group) {
                return next(new AppError('Group not found', 404));
            }
            res.status(200).json(group);
        } catch (error) {
            next(new AppError('Error adding quot in group', 500));
        }
    }

    static async removeQuote(req, res, next) {
        try {
            const id = req.params.id;
            const existingGroup = await GroupDAO.getGroupById(id);
            if (!existingGroup) {
                return next(new AppError('Group not found', 404));
            }

            const quoteId = req.body.quote;
            const group = await GroupDAO.removeQuote(id, quoteId);
            if (!group) {
                return next(new AppError('Group not found', 404));
            }
            res.status(200).json(group);
        } catch (error) {
            next(new AppError('Error removing quote in group', 500));
        }
    }

    static async deleteGroupById(req, res, next) {
        try {
            const id = req.params.id;
            const existingGroup = await GroupDAO.getGroupById(id);
            if (!existingGroup) {
                return next(new AppError('Group not found', 404));
            }

            await GroupDAO.deleteGroupById(id);
            res.status(200).json("Group successfully deleted");
        } catch (error) {
            next(new AppError('Error deleting group', 500));
        }
    }
}

module.exports = GroupController;
