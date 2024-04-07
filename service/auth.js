const jwt = require("jsonwebtoken");
const secret = "Sugam@123";
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id, //This is stored as the data of user we will get the same data in getUser function
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
