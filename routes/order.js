require("../middlewares/passport");
const router = require("express-promise-router")();
const passport = require("passport");

const orderControllers = require("../controllers/order");
const adminRight = require("../middlewares/adminRight");

//0. Top middleware
router.use(passport.authenticate("jwt", { session: false }));

//1. Add an order
router.post("/add", orderControllers.add);
//2. Get an order
router.get("/one/:orderId", adminRight, orderControllers.getOne);
//3. Get existing orders
router.get("/all", adminRight, orderControllers.getAll);
//4. Get user's orders
router.get("/mine", orderControllers.getMine);
//5. Remove order by Id
router.delete("/:orderId", orderControllers.remove);
//6. Update order by Id
router.patch("/:orderId", orderControllers.update);

module.exports = router;
