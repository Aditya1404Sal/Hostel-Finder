const express = require('express');
const { LoginController, RegisterController, authController, HostelRegisterController, HostelDetailPageController, UpdateHostelController, HostelDataFetcher, HostelRestrictedToPinCode} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//router

const router = express.Router();


//login
router.post('/Login' , LoginController);

router.post('/UpdateHostel',authMiddleware,UpdateHostelController);

router.post('/getHostelDetails',authMiddleware,HostelDetailPageController);
//register
router.post('/Register' , RegisterController);

router.post('/getParticularHostelsDetails',HostelDataFetcher);

router.post('/RegisterHostel', HostelRegisterController);
//Auth
router.post('/getUserData',authMiddleware,authController);

router.post('/getPinCodeSpecificHostels',HostelRestrictedToPinCode);

module.exports = router;