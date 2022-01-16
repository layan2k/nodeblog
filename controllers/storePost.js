const BlogPost = require('../models/BlogPost');

module.exports = (req,res)=>{
    let image = req.files.image
    image.mv(path.resolve(__dirname,'public/assets/img',image.name),async(error)=>{
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })

}