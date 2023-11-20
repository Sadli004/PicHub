const UserModel = require('../Model/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

// get all users
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.send(users);
};  

// get user 
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id).select('-password')
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
  console.log(err);
})}

// update user
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true })
      .then((data) => {res.send(data)
       console.log(req.body.bio)}
      )
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//deleteUser 
module.exports.deleteUser = async (req ,res) => { 
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);
 
   try{
   await UserModel.findByIdAndRemove(req.params.id).exec();
    res.status(200).json({ message: "Successfully deleted. "});
  }
  catch(err){
    res.status(500).json({ error: err});  
  }
}

//follow a user 
module.exports.follow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idtoFollow))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    // Add to the follower list
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idtoFollow } },
      { new: true, upsert: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Add to the following list
    await UserModel.findByIdAndUpdate(
      req.body.idtoFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    );

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};


// unfollow a user 
module.exports.unfollow = async function (req, res) {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idtoUnfollow))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    // Remove from following
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { following: req.body.idtoUnfollow },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Remove follower
    await UserModel.findByIdAndUpdate(
      req.body.idtoUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

