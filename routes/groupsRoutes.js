const express = require('express')
const GroupController =require('../controllers/GroupController')
const jwtUtils = require('../utils/jwt')
const router = express.Router();


router.get('/:name',GroupController.getGroupsByName);
router.get('/:id',GroupController.getGroupById);

router.post('/',jwtUtils.verifyToken,GroupController.createGroup);
router.put('/:id',jwtUtils.verifyToken,GroupController.updateGroup);


module.exports = router;