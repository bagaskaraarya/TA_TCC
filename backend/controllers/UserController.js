import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET USER
export async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "Success",
      message: "Users Retrieved",
      data: users,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET USER BY ID
export async function getUserById(req, res) {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      const error = new Error("User tidak ditemukan !");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      status: "Success",
      message: "User Retrieved",
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET USER BY EMAIL
export async function getUserByEmail(req, res) {
  try {
    const user = await User.findOne({ where: { email: req.params.email } });
    if (!user) {
      const error = new Error("User tidak ditemukan !");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      status: "Success",
      message: "User Retrieved",
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      const msg = `${
        !name ? "Nama" : !email ? "Email" : !role ? "Role" : "Password"
      } field cannot be empty !`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      const error = new Error("Email Sudah Terdaftar !");
      error.statusCode = 400;
      throw error;
    }

    const encryptedpass = await bcrypt.hash(password, 5);
    await User.create({
      name: name,
      email: email,
      role: role,
      password: encryptedpass,
    });
    res.status(201).json({
      status: "Success",
      message: "User Added",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// UPDATE USER tanpa mengubah role
export async function updateUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const msg = `${
        !name ? "Name" : !email ? "Email" : "Password"
      } field cannot be empty !`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    const ifUserExist = await User.findOne({ where: { id: req.params.id } });

    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan !");
      error.statusCode = 400;
      throw error;
    }

    const encryptedpass = await bcrypt.hash(password, 5);

    const updatedData = {
      name,
      email,
      password: encryptedpass,
    };

    await User.update(updatedData, {
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Success",
      message: "User Updated",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}


// DELETE USER
export async function deleteUser(req, res) {
  try {
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });
    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan !");
      error.statusCode = 400;
      throw error;
    }

    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      status: "Success",
      message: "User Deleted",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// LOGIN HANDLER
export async function loginHandler(req, res){
  try{
      const{email, password} = req.body;
      const user = await User.findOne({
          where : {
              email: email
          }
      });

      if(user){
        const userPlain = user.toJSON();
        const { password: _, refresh_token: __, ...safeUserData } = userPlain;


          const decryptPassword = await bcrypt.compare(password, user.password);
          if(decryptPassword){
              const accessToken = jwt.sign(safeUserData, process.env.ACCESS_TOKEN_SECRET, {
                  expiresIn : '12h' 
              });
              const refreshToken = jwt.sign(safeUserData, process.env.REFRESH_TOKEN_SECRET, {
                  expiresIn : '1d' 
              });
              await User.update({refresh_token:refreshToken},{
                  where:{
                      id:user.id
                  }
              });
              res.cookie('refreshToken', refreshToken,{
                  httpOnly : true,
                  sameSite : 'Strict',  
                  maxAge  : 24*60*60*1000,
                  secure: true 
              });
              res.status(200).json({
                  status: "Succes",
                  message: "Login Berhasil",
                  user: safeUserData,
                  accessToken 
              });
          }
          else{
              res.status(400).json({
                  status: "Failed",
                  message: "Password atau email salah",
                
              });
          }
      } else{
          res.status(400).json({
              status: "Failed",
              message: "Password atau email salah",
          });
      }
  } catch(error){
      res.status(error.statusCode || 500).json({
          status: "error",
          message: error.message
      })
  }
}

// LOGOUT
export async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await User.findOne({
    where: { refresh_token: refreshToken },
  });

  if (!user) return res.sendStatus(204);

  const userId = user.id;

  const [updated] = await User.update(
    { refresh_token: null },
    { where: { id: userId } }
  );

  console.log("Jumlah data yang diupdate:", updated);

  res.clearCookie("refreshToken");
  return res.sendStatus(200);
}

