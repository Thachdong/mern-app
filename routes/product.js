require("../middlewares/passport");
const router = require("express-promise-router")();
const passport = require("passport");

const productControllers = require("../controllers/product");
const adminRight = require("../middlewares/adminRight");
const { multerUpload } = require("../middlewares/multer");

//2. Get all product
router.get("/products", productControllers.getAll);

//0. Commonly middlewares
router.use(passport.authenticate("jwt", { session: false }), adminRight);

//1. Add product
router.post("/add", multerUpload, productControllers.add);

//3. Get product by id
router.get("/:productId", productControllers.getById);

//4. Update product by id
router.patch("/:productId", productControllers.update);

//5. Remove product by id
router.delete("/:productId", productControllers.remove);

module.exports = router;
