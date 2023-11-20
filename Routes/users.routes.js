const router = require('express').Router();
const authController = require('../Controller/auth.controller');
const userController = require('../Controller/user.controller');
const multer = require('multer');
//authentication
router.post('/register', authController.signUp);
router.post('/login', authController.signIn) ;
router.get('/logout',authController.logout);
// user Db 
router.get('/',userController.getAllUsers);
router.get('/:id',userController.userInfo);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);
router.patch('/follow/:id',userController.follow);
router.patch('/unfollow/:id',userController.unfollow);
// Upload 
// router.post("/upload",upload.single("file"), uploadController.uploadProfil);
module.exports=router;