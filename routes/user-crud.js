const {
  createUser,
  readAllUsers,
  readSingleUsers,
  updateUser,
  deleteUser,
  // readSig,
  deleteAll,
} = require("../controllers/user-crud");

const router = require("express").Router();

router.get("/create", createUser);
router.get("/all", readAllUsers);
router.get("/read", readSingleUsers);
router.get("/update", updateUser);
router.get("/delete", deleteUser);
router.get("/deleteAll", deleteAll);
// router.get("/read/:id", readSig); //req.params
// router.get("/read", readSig);  //req.query

module.exports = router;
