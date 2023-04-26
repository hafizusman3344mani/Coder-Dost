const fs = require("fs");
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname , "data.json"), "utf-8"));
const users = data.users   ;

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    result: "success",
    message: "Users fetched successfully!",
    data: users,
  });
};

exports.getUserById = (req, res) => {
  const userId = +req.params.id;

  const user = users.find((p) => p.id === userId);
  console.log(user);
  if (!user) {
    res.status(200).json({
      result: "error",
      message: "user not found!",
      data: null,
    });
  } else {
    res.status(200).json({
      result: "success",
      message: "user fetched successfully!",
      data: user,
    });
  }
};

exports.addUser = (req, res) => {
    const user = req.body;
  var changedUser = data.users ;
  const userIndex = users.findIndex(
    (us) => us.id === parseInt(user.id)
  );
  if(userIndex == -1){
    changedUser.push(user);
  data.users    = changedUser;
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.status(500).json({
        result: "error",
        message: "User not added!",
        data: null,
      });
    }
    return res.status(200).json({
      result: "success",
      message: "User added successfully!",
      data: req.body,
    });
  });
  }else{
    res.status(500).json({
        result: "error",
        message: "User already exist!",
        data: null,
      });
  }
};

exports.replaceUser = (req, res) => {
  const user = req.body;
  const userId = +req.params.id;
  console.log(user.id);
  const indexToChange = users.findIndex(
    (us) => us.id === parseInt(userId)
  );
  console.log(indexToChange);
  if (indexToChange == -1) {
    return res.status(500).json({
      result: "error",
      message: "User not found!",
      data: null,
    });
  } else {
    users  .splice(indexToChange, 1, {...user,id:userId});
    data.users  = users ;
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) {
        return res.status(500).json({
          result: "error",
          message: "User not updated!",
          data: null,
        });
      }
      res.status(200).json({
        result: "success",
        message: "User updated successfully!",
        data: req.body,
      });
    });
  }
};

exports.updateUser = (req, res) => {
    const userData = req.body;
    const userId = +req.params.id;
    const indexToChange = users.findIndex(
      (us) => us.id === parseInt(userId)
    );
    const user = users[indexToChange];
    console.log(indexToChange);
    if (indexToChange == -1) {
      return res.status(500).json({
        result: "error",
        message: "User not found!",
        data: null,
      });
    } else {
      users  .splice(indexToChange, 1, {...user,...userData,id:userId});
      data.users  = users ;
      fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
          return res.status(500).json({
            result: "error",
            message: "User not updated!",
            data: null,
          });
        }
        res.status(200).json({
          result: "success",
          message: "User updated successfully!",
          data: users[indexToChange],
        });
      });
    }
};

exports.deleteUser = (req, res) => {
  const userId = +req.params.id;
  const indexToRemove = users  .findIndex((usr) => usr.id === userId);
if(indexToRemove == -1){
    return res.status(500).json({
        result: "error",
        message: "User not found!",
        data: null,
      });
}else{
    const user = users[indexToRemove];
    users.splice(indexToRemove, 1);
    data.users    = users   ;
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) {
        return res.status(500).json({
          result: "error",
          message: "user not deleted!",
          data: null,
        });
      }
      res.status(200).json({
        result: "success",
        message: "user deleted successfully!",
        data: user,
      });
    });
}
};
