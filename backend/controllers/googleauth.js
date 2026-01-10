const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        username: email.split("@")[0],
        firstName: name.split(" ")[0],
        lastName: name.split(" ").slice(1).join(" "),
        profileImage: picture,
        password: sub,
        isGoogleUser: true,
      });
    }

    const jwtToken = user.generateToken();

    res.status(200).json({
      token: jwtToken,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google login failed" });
  }
};
