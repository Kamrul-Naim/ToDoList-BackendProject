const express=require("express");
const router=express.Router();
const profileController=require("../controllers/profileController.js");
const authVerifyMiddleware=require("../middleware/authVerifyMiddleware.js");
const todoListController=require("../controllers/todoListController.js");


//Profile routes
router.post("/createProfile",profileController.createProfile);
router.post("/userLogin",profileController.userLogin);

router.get("/selectProfile",authVerifyMiddleware,profileController.selectProfile);
router.put("/updateProfile",authVerifyMiddleware,profileController.updateProfile);


//Todo List routes
router.post("/createList",authVerifyMiddleware,todoListController.createList);
router.get("/selectList",authVerifyMiddleware,todoListController.selectList);
router.put("/updateList",authVerifyMiddleware,todoListController.updateList);
router.put("/updateStatus",authVerifyMiddleware,todoListController.updateStatus);
router.delete("/removeTask",authVerifyMiddleware,todoListController.removeTask);
router.get("/selectByStatus",authVerifyMiddleware,todoListController.selectByStatus);
router.get("/selectByDate",authVerifyMiddleware,todoListController.selectByDate);


module.exports=router;