var express = require('express');
var router = express.Router();
const blogController = require('../controller/blog')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/blogimg')
    },
    filename: function (req, file, cb) {
      console.log(file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/add', upload.array('images'), blogController.addBlog);

router.delete('/delete/:id', blogController.delBlog)

router.patch('/update/:id', upload.array('images'), blogController.upBlog)

router.get('/all', blogController.findBlog)

router.get('/find', blogController.searchBlog)

router.get('/page1', blogController.page1)

router.get('/page2', blogController.page2)


module.exports = router;
