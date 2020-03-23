const router = require("express").Router();
const {getTestcases, getTestcase,
        createTestcase, updateTestcase, deleteTestcase} = require("../../controllers/testcase.controller");
const {verifyCourseAdmin, verifyCourseAdminOrUser} = require('../../middlewares/verifyEntity.middleware');

router.use(verifyCourseAdminOrUser);

router.get("/", getTestcases);

router.get("/:testcaseId", getTestcase);

router.post("/", verifyCourseAdmin, createTestcase);

router.put("/:testcaseId", verifyCourseAdmin, updateTestcase);

router.delete("/:testcaseId", verifyCourseAdmin, deleteTestcase);

module.exports = router;