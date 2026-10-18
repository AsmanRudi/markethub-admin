const router = require("express").Router();
const dummy = require("../dataDummy");

const actions = {
  Users: dummy.addUsers,
  Products: dummy.addProducts,
  Categories: dummy.addCategories,
  Orders: dummy.addOrders,
};

for (const [name, action] of Object.entries(actions)) {
  router.post(`/add${name}`, async (req, res) => {
    try {
      const result = await action();

      res.status(201).json({
        success: true,
        message: `Dummy ${name} berhasil diproses`,
        result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
}

module.exports = router;