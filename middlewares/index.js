const admin =require("../firebase");
const User =require("../models/user");

exports.findOrCreateUser = async (req, res, next) => {
  console.log("REQ HEADERS TOKEN", req.headers.token);
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.token);
    console.log("FIREBASE USER IN CURRENT USER MIDDLEWARE", firebaseUser);
    // save the user to db or send user response if it is already saved
    const user = await User.findOne({ email: firebaseUser.email });
    if (user) {
      // send user response
      console.log("FOUND USER =====> ", user);
      // add current user to req object
      req.currentUser = user;
      next();
      // res.json(user);
    } else {
      // create new user and then send that user as response
      let newUser = await new User({
        email: firebaseUser.email,
        name: firebaseUser.name
          ? firebaseUser.name
          : firebaseUser.email.split("@")[0],
        picture: firebaseUser.picture ? firebaseUser.picture : "https://i.ibb.co/4pDNDk1/avatar.png",
      }).save();
      console.log("NEW USER =====> ", newUser);
      req.currentUser = newUser;
      next();
      // res.json(newUser);
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};
