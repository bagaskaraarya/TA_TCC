import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log({ refreshToken });

    if (!refreshToken) return res.sendStatus(401); // Unauthorized

    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) return res.sendStatus(403); // Forbidden (refresh token tidak valid / user tidak ditemukan)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); // Forbidden (token expired atau invalid)

      console.log("Refresh token valid, generate new access token");

      // Hilangkan password & refresh_token dari data yang dikirim ke token
      const userPlain = user.toJSON();
      const { password: _, refresh_token: __, ...safeUserData } = userPlain;

      // Generate access token baru
      const accessToken = jwt.sign(safeUserData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5m",
      });

      res.json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal Server Error
  }
};
