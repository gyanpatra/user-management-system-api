const express = require("express");
const validate = require("express-validation");
const userManagementController = require("../controllers/user-management-controller");
const paramValidator = require("./validator/param-validation");

const router = express.Router(); // eslint-disable-line new-cap

router.route("/list")
  .get(userManagementController.getUsersList);
router.route("/add")
  .post(validate(paramValidator.addUsers), userManagementController.createUsers)
router.route("/revoke")
  .delete(validate(paramValidator.revokeUser), userManagementController.revokeUser)
router.route("/reinvite")
    .post(validate(paramValidator.resendInvite), userManagementController.resendInvite)

module.exports = router;
