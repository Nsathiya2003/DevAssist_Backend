import { OAuth2Client } from "google-auth-library";
import dotenv from 'dotenv';
import { User } from "../models/user-model.js";
import { generateAccessToken } from "../middleware/auth/authentication.js";

dotenv.config()

async function VerifyIdToken(token){
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    console.log(payload)

    const { email,email_verified,name,given_name,sub} = payload;
    return {
        email:email,
        email_verified:email_verified,
        name:name,
        given_name:given_name,
        googleId:sub
    }
}

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;

    // 1. Verify token
    const data = await VerifyIdToken(token);

    // 2. Check user
    let user = await User.findOne({ email: data.email });

    // 3. If not exist → create
    if (!user) {
      user = await User.create({
        username: data.name,
        email: data.email,
        googleId: data.googleId,
      });
    }

    // 4. Generate JWT (for BOTH cases)
    const payload = {
      user: {
        _id: user._id,
        email: user.email,
      },
    };

    const accessToken = await generateAccessToken(payload);

    // 5. Response
    return res.status(200).json({
      status:'success',
      message:'User Logged in successfully',
      data:{
            accessToken : token
        }
    });

  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Failed to login user",
      error: error.message,
      data: [],
    });
  }
};