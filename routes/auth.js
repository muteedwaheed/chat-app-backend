const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  auth,
} = require("../controllers/userController");
const middleWare = require("../middleware/auth");


const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/auth-login",middleWare,auth)
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
