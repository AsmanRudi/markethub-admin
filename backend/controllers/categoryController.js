const Category = require("../models/Category");
const createCrudController = require("./crudController");


console.log("Category:", typeof Category);
console.log("Category.find:", typeof Category.find);
console.log("createCrudController:", typeof createCrudController);

module.exports = createCrudController(Category, "ct_id");