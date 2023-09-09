const CATEGORY = require('../model/category')

exports.addBlogCat = async function(req, res, next) {
    try {
      console.log(req.body);
      req.body.image = req.file.filename
      if(!req.body.name || !req.body.image){
        throw new error("Please Enter valide Fields")
      }
      const addData = await CATEGORY.create(req.body)
      res.status(201).json({
        status:"Success",
        message:"Category Added",
        data: addData
      })
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

exports.delBlogCat = async function (req, res, next) {
    try {
        await CATEGORY.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "success",
            message: "Category Deleted",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
  }

exports.upBlogCat = async function (req, res, next) {
    try {
        await CATEGORY.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            status: "success",
            message: "Catagory updated",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
  }

exports.findBlogCat = async function (req, res, next) {
    try {
        const findCatagory = await CATEGORY.find()
        res.status(200).json({
            status: "success",
            message: "All User Found",
            data: findCatagory
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
  }