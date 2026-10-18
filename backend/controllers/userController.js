const User = require("../models/User");
const createCrudController = require("./crudController");

module.exports = createCrudController(User, "us_id", {
    user: true,
});