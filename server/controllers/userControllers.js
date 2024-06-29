const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signupUser = async (req, res) => {
  const { email, password, username, role } = req.body;
  let profileImage = null;

  if (req.file) {
    profileImage = `${req.file.filename}`;
  }

  console.log(req.file);
  console.log(req.body);

  if (!email || !password || !username || !role) {
    return res.status(400).json("Fill all input Fields");
  }

  let admin = false;

  if(role === "admin"){
    admin = true;
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      password: hashedpassword,
      role,
      profileImage,
    });

    res.status(200).json({ message: "User Created Successfully", user, admin });
  } catch (error) {
    console.log("Error while creating User", error);
    res.status(500).json("Error while creating a User");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res.status(400).json("Fill all the fields");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Error while finding User" });
    }

    const passwordcheck = await bcrypt.compare(password, user.password);

    if (!passwordcheck) {
      return res.status(404).json("Password is incorrect");
    }

    let admin = false;

    if(user.role === "admin"){
      admin = true;
    }

    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    return res
      .cookie("Token", token, {
        httpOnly: true,
        // Add other cookie options as needed for security
      })
      .status(200)
      .json({ message: "You are logged in Successfully", token, admin });
  } catch (error) {
    console.log("Error while logging in", error);
    res.status(500).json({ message: "Error while logging IN" });
  }
};

const updateUser = async (req, res) => {
  const existingtoken = req.headers.authorization;
  if (!existingtoken) {
    return res.status(401).json("Unauthorized");
  }

  const authToken = existingtoken.split(" ")[1];
  if (!authToken) {
    return res.status(401).json("Unauthorized");
  }

  let profileImage = null;

  try {
    const verifytoken = jwt.verify(authToken, process.env.SECRET_KEY);
    const { id } = verifytoken;

    const { email, username, oldpassword, newpassword, role } = req.body;

    if (req.file) {
      profileImage = req.file.filename; // Assuming req.file.filename contains the image filename
    }

    const olduser = await User.findById(id);
    if (!olduser) {
      return res.status(404).json("User not found");
    }

    // Check if oldpassword matches the stored hashed password
    if (oldpassword) {
      const oldpasswordcheck = await bcrypt.compare(
        oldpassword,
        olduser.password
      );
      if (!oldpasswordcheck) {
        return res.status(400).json("Old password is not matched");
      }
    }

    let admin = false;

    if(role === "admin"){
      admin = true;
    }

    const updateData = {
      username,
      email,
      role,
    };

    // Add profileImage to updateData if it exists
    if (profileImage) {
      updateData.profileImage = profileImage;
    }

    // Update password if newpassword is provided
    if (newpassword) {
      const hashedPassword = await bcrypt.hash(newpassword, 10);
      updateData.password = hashedPassword;
    }

    // Update user in the database
    const newuser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!newuser) {
      return res.status(404).json("User not found");
    }

    return res.status(200).json({ message: "User update succesfuly", newuser, admin });
  } catch (error) {
    console.log("Error while updating the user", error);
    res.status(500).json("An error occurred while updating the user");
  }
};


const deleteUser = async (req, res) => {
  const token = req.headers.authorization;
  console.log(req.body);

  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  const authToken = token.split(" ")[1];

  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  try {
    const verifyToken = jwt.verify(authToken, process.env.SECRET_KEY);
    const { id } = verifyToken;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Error while deleting User" });
    }

    res.status(200).json({ message: "User deleted Successfully", user });
  } catch (error) {
    console.log("Error while verify the token", error);
    res.status(500).json("Token is not valid");
  }
};

const profileUser = async (req, res) => {
  const token = req.headers.authorization;
  console.log(req.body);
  console.log(req.headers.authorization)

  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  const authToken = token.split(" ")[1];

  try {
    const verifyToken = jwt.verify(authToken, process.env.SECRET_KEY);
    const { id, role } = verifyToken;

    let admin = false;

    if(role === "admin"){
      admin = true;
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Error while finding  User" });
    }

    res.status(200).json({user, admin});
  } catch (error) {
    console.log("Error while fetching profile", error);
    res.status(500).json("Error while fetching the User Profile");
  }
};

module.exports = { loginUser, signupUser, updateUser, deleteUser, profileUser };
