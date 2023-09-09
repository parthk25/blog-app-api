const BLOG = require('../model/blog')

exports.addBlog = async function (req, res) {
  try {
    req.body.images = []
    const file = req.files

    file.map((el) => {
      req.body.images.push(el.filename)
    })

    if (!req.body.title || !req.body.discription || !req.body.images.length || !req.body.category) {
      throw new Error("Please Enter Valide field")
    }
    const addBlog = await BLOG.create(req.body)
    res.status(201).json({
      status: "Success",
      message: "Blog Added SuccessFully",
      data: addBlog
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    })
  }
}

exports.delBlog = async function (req, res) {
  try {
    await BLOG.findByIdAndDelete(req.params.id)
    res.status(201).json({
      status: "success",
      message: "Blog Deleted SuccessFully",
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.upBlog = async function (req, res) {
  try {
    const data = await BLOG.findById(req.params.id)
    const upData = { ...data._doc, ...req.body }

    if (req.files) {
      upData.images = []
      const file = req.files
      file.map((el) => {
        console.log(el.filename);
        upData.images.push(el.filename)
      })
    }

    await BLOG.findByIdAndUpdate(req.params.id, upData)

    res.status(201).json({
      status: "success",
      message: "Blog updated SuccessFully",
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.findBlog = async function (req, res) {
  try {
    const findBlog = await BLOG.find().populate('category')
    res.status(200).json({
      status: "success",
      message: "All Blog Found",
      data: findBlog
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.searchBlog = async function (req, res) {
  try {
    const blogSearch = await BLOG.find({
      "$or": [
        { title: { '$regex': req.query.search, '$options': 'i' } },
        { discription: { '$regex': req.query.search, '$options': 'i' } }
      ]
    })
    res.status(201).json({
      status: "success",
      message: "Blog Find SuccessFully",
      blogSearch
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.page1 = async function (req, res) {
  try {
    const page1Data = await BLOG.find().skip(0).limit(2)
    res.status(200).json({
      status: "success",
      message: "Page 1 Blog Found",
      data: page1Data
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.page2 = async function (req, res) {
  try {
    const page2Data = await BLOG.find().skip(2).limit(2)
    res.status(200).json({
      status: "success",
      message: "Page 2 Blog Found",
      data: page2Data
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}