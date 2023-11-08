// it will not create new instance of express
const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

router.get('/', homeController.home);

router.use('/users',require('./users'))
//for any further routes, access from here
//router.use('/router_name', require('./routerfile'));
router.use('/posts', require('./posts'));
console.log('Router loaded')
module.exports = router;