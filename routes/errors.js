const express =  require("express");
const router = express.Router();
const errorsController = require("../controllers/errors");

router.all("*",errorsController.get404error);

module.exports=router;