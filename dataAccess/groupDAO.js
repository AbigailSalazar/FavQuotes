const Group = require('../models/Group');

class GroupDAO {
    constructor() {

    }

    async createGroup(groupData) {
        try {
            const group = new Group(groupData);
            const newGroup = await group.save();
            return newGroup;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getGroupById(id) {
        try {
            return await Group.findById(id).populate('quotes');
        } catch (error) {
            throw error;
        }
    }

    async getGroupsByName(name) {
        try {
            return await Group.find({ name }).populate('quotes');
        } catch (error) {
            throw error;
        }
    }

    async updateGroup(id, groupData) {
        try {
            return await Group.findByIdAndUpdate(id, groupData, { new: true }).populate('quotes');
        } catch (error) {
            throw error;
        }
    }

    async addQuote(id, quote) {
        try {
            return await Group.findByIdAndUpdate(id, {$push:{quotes:quote }}, { new: true });
        }
        catch (error) {

        }
    }

    async removeQuote(id, quote) {
        try {
            return await Group.findByIdAndUpdate(id, {$pull:{quotes:quote }}, { new: true });
        }
        catch (error) {

        }
    }

    async deleteGroupById(id) {
        try {
            return await Group.findOneAndDelete({ _id: id });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new GroupDAO();
