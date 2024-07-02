const Group = require('../entities/Group');
const db = require('../config/db');
const GroupDAO = require("../dataAccess/groupDAO");

async function main() {
    await db.connect().then(() => {
        console.log('Connection successful');
    }).catch((err) => {
        console.log(err);
    });

    // Tests

    // Create
    await GroupDAO.createGroup(new Group("Group A", "photoA.jpg", [])).then(groupSaved => {
        console.log('Group created successfully', groupSaved);
    }).catch(err => {
        console.log('Error creating group', err);
    });

    await GroupDAO.createGroup(new Group("Group B", "photoB.jpg", [])).then(groupSaved => {
        console.log('Group created successfully', groupSaved);
    }).catch(err => {
        console.log('Error creating group', err);
    });

    await GroupDAO.createGroup(new Group("Group C", "photoC.jpg", [])).then(groupSaved => {
        console.log('Group created successfully', groupSaved);
    }).catch(err => {
        console.log('Error creating group', err);
    });

    // Read
    console.log('Retrieving all groups by name - Group B...');
    let retrievedGroups = await GroupDAO.getGroupsByName("Group B");
    console.log(retrievedGroups);

    console.log('Retrieving group by ID...');
    let retrievedGroup = await GroupDAO.getGroupById(retrievedGroups[0]._id);
    console.log(retrievedGroup);

    // Update
    console.log('Updating group Group B...');
    const updatedGroupData = new Group("Group B Updated", "photoB_updated.jpg", []);
    let updatedGroup = await GroupDAO.updateGroup(retrievedGroups[0]._id, updatedGroupData);
    console.log(updatedGroup);

    // Delete
    console.log('Deleting group by ID...');
    let deletedGroup = await GroupDAO.deleteGroupById(retrievedGroups[0]._id);
    console.log('Group deleted successfully', deletedGroup);

    await db.disconnect().then(() => {
        console.log('Disconnection successful');
    }).catch((err) => {
        console.log(err);
    });
}

main();
