var express = require('express');
var router = express.Router();

router.use("/student",require('./student/index'))

module.exports = router;
