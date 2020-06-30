require("../middlewares/passport");
const router = require("express-promise-router")();
const passport = require("passport");

const userControllers = require("../controllers/user");
const adminRight = require("../middlewares/adminRight");

//1. Register an user
router.post("/register-user", userControllers.register);

//2. Register an admin
router.post(
  "/register-admin",
  passport.authenticate("jwt", { session: false }),
  adminRight,
  userControllers.register
);

//3. Login
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userControllers.login
);

//4. Logout
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  userControllers.logout
);

//5. Get all users
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  adminRight,
  userControllers.getUsers
);

//6. Get user by id
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userControllers.getUserById
);

//7. Update user by id
router.patch(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userControllers.updateUserById
);

//8. Remove user by id
router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  adminRight,
  userControllers.removeUserById
);

module.exports = router;
