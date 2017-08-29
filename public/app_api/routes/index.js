var express = require('express');
var router = express.Router();
var expressjwt = require('express-jwt');
var auth = expressjwt({
  secret: 'kalos',
  userProperty: 'payload'
});

//User
var ctrlUser = require('../controllers/user');
router.post('/user/add', ctrlUser.addUser);
router.get('/user/get', ctrlUser.getUser);
router.post('/user/update', ctrlUser.updateUser);
router.delete('/user/delete', ctrlUser.deleteUser);

router.post('/user/login', ctrlUser.login);
router.post('/user/register', ctrlUser.register);