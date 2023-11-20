const PostModel = require('../Model/post.model');
const UserModel = require('../Model/user.model');
const userModel = require('../Model/user.model');
const ObjectID = require("mongoose").Types.ObjectId;

// read post 
module.exports.readPost = (req, res) => {
  PostModel.find()
  .then((data) => res.send(data))
  .catch((err) => res.status(500).send({ message: err }))
  
};
const multer = require('multer');
const path = require('path');
const { uploadErrors } = require('../utils/errors.utils');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'client', 'public', 'uploads', 'posts'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '_' + Math.random();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

module.exports.upload = multer({ storage: storage });

// create post
module.exports.createPost =  async (req, res) => {
  if (req.file !== null) {
    try {
      const allowedExtensions = ['.png', '.jpg', '.jpeg'];
      const fileExtension = path.extname(req.file.originalname).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Invalid file format. Only PNG, JPG, and JPEG files are allowed.');
      }

      const maxFileSize = 500000; // 500 KB
      if (req.file.size > maxFileSize) {
        throw new Error('File size exceeds the maximum limit (500 KB).');
      }
    } catch (err) {
      console.log(err);
      const errors = uploadErrors(err);
      return res.send({ errors });
    }
  }

  try {
    const newPost = new PostModel({
      posterId: req.body.posterId,
      message: req.body.message,
      picture: req.file !== null ? `./uploads/posts/` + req.file.filename : '',
      video: req.body.video,
      likers: [],
      comments: [],
    });

    await newPost.save();
    res.status(201).send(newPost);
  } catch (err) {
    res.status(400).send(err);
  }
};

// update post 
module.exports.updatePost = async (req,res) => { 
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    const updatedData = { 
        message : req.body.message
    }
    await PostModel.findByIdAndUpdate( req.params.id , 
        {$set:updatedData},
        {new : true} )
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }))
}
// delete post 
module.exports.deletePost = async (req,res) => { 
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try{
        await PostModel.findByIdAndRemove(req.params.id).exec();
         res.status(200).json({ message: "Successfully deleted. "});
       }
       catch(err){
         res.status(500).json({ error: err});  
       }
}
// like a post 
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
     return res.status(400).send("ID unknown : " + req.params.id);
 
  try {
     // add the user to the post likers
     const postData = await PostModel.findByIdAndUpdate(req.params.id,
       {$addToSet: {likers: req.body.likerId} },
       {new: true})
       .catch((err) => res.status(500).send({ message: err }));
 
      if (postData) res.send(postData);
 
     // add the post to the user's likes 
      await UserModel.findByIdAndUpdate(req.body.likerId,
       {$addToSet : {likes: req.params.id} },
       {new: true})
       .catch((err) => res.status(500).send({ message: err }));
 
  } catch (err) {
     res.status(500).json({ error: err });
  }
 };

module.exports.unlikePost = async (req, res) => {
 if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

 try {
    let updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    );

    if (!updatedPost)
      return res.status(400).send("Unable to unlike post.");

    let updatedUser = await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    );

    if (!updatedUser)
      return res.status(400).send("Unable to unlike post for user.");

    res.send({ updatedPost, updatedUser });
 } catch (err) {
    return res.status(400).send(err);
 }
};

// Comments 
// comment post 
module.exports.commentPost = async (req,res) => { 
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id); 
  try { 
    return PostModel.findByIdAndUpdate(req.params.id, 
      {$push : 
      {
        comments:{
          commenterId: req.body.commenterId,
          commenterPseudo: req.body.commenterPseudo,
          text: req.body.text,
          timestamp: new Date().getTime(), } 
      }},
      {new:true})
      .then((data) => res.send(data))
      .catch((err)=> res.status(500).send({message : err}))
  }catch(err){
    return res.status(400).send(err); 
  }
}
// edit comment 
module.exports.editComment=async (req , res ) =>{
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  
try {
  const docs = await PostModel.findById(req.params.id);
  if (!docs) {
    return res.status(404).send("Post not found");
  }

  const theComment = docs.comments.find((comment) =>
    comment._id.equals(req.body.commentId)
  );

  if (!theComment) {
    return res.status(404).send("Comment not found");
  }

  theComment.text = req.body.text;

  try {
    await docs.save();
    return res.status(200).send(docs);
  } catch (err) {
    return res.status(500).send(err);
  }
} catch (err) {
  return res.status(400).send(err.message);
}

  };

 // delete comment 
 module.exports.deleteCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }
  
  try {
    const result = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {  comments : {
          _id: req.body.commentId} },
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Post not found.");
    }

    res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message); // Internal Server Error
  }
}
