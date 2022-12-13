import User from "../model/user_model";
import responseHelper from "../helper/response_helper";
import bcrypt from "bcrypt";
import Organisation from "../model/organisation_model";

// register and creating user
export const userRegister = async (req, res) => {
  const userExist = await User.findOne({ userName: req.body.userName }).lean();
  if (userExist) {
    const resPayload = {
      message: "Username  already exist",
    };
    return responseHelper.error(res, resPayload);
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    userName: req.body.userName,
    editPassword: req.body.editPassword,
  });
  const resPayload = {
    message: "User created",
    payload: user,
  };
  return responseHelper.success(res, resPayload);
};

// updating user
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id).lean();
  if (!user) {
    const resPayload = {
      message: "User not found",
    };
    return responseHelper.error(res, resPayload);
  }

  const updatedObj = req.body;
  // if password exist in request body, then work on it
  if (req.body.password) {
    //  const changePassword = await User.findOne({editPassword: req.body.editPassword})
    if (user.editPassword == true) {
      if (user.password.length < 8) {
        const resPayload = {
          message: "Password too small",
        };
        return responseHelper.error(res, resPayload);
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 8);

      updatedObj.password = hashedPassword;
    } else {
      const resPayload = {
        message: "User cannot update the password",
      };
      return responseHelper.error(res, resPayload);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedObj).select('-password');
  const resPayload = {
    message: "User information updated",
    payload: updatedUser,
  };
  return responseHelper.success(res, resPayload);
};

// list of user with his organisation name
export const userList = async (req, res) => {
  const user = await User.findById({ _id: req.params.id }).lean();
  console.log(" userid- ",req.params.id)
  if (!user) {
    const resPayload = {
      message: "User not found",
    };
    return responseHelper.error(res, resPayload);
  }
  const org = await Organisation.find({ userId: req.params.id });
  if (!org) {
    const resPayload = {
      message: "Organisation data not found",
    };
    return responseHelper.error(res, resPayload);
  }
  // const name = org.map(function(org){
  //   return org.name 
  // })
  // console.log("org data- ", name)

  const list = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userName: user.userName,
    organisationsName: org,
  };
  
  const resPayload = {
    message: "Users with organisation name",
    payload: list,
  };
  return responseHelper.success(res, resPayload);
};

export const getUserById = async(req,res)=>{
  const user = await User.findById(req.params.id,{password: 0})
  console.log(user)
  const resPayload = {
    message: 'User information',
    payload: user
  }
  return responseHelper.success(res,resPayload)
}
