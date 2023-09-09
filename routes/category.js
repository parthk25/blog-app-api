var express = require('express');
var router = express.Router();
const blogCatController = require('../controller/category')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/catimg')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/add', upload.single('image'), blogCatController.addBlogCat);

router.delete('/delete/:id', blogCatController.delBlogCat)

router.patch('/update/:id', upload.single('image'), blogCatController.upBlogCat)

router.get('/all', blogCatController.findBlogCat)

module.exports = router;
