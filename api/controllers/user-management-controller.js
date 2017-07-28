const forEach = require("lodash/forEach");
const values = require("lodash/values");
const filter = require("lodash/filter");
const isEmpty = require("lodash/isEmpty");
const remove = require("lodash/remove");

const userStatus = require("../enums/users-status");
const actionTypes = require("../enums/action-types");


const masterUsersList = [
    {
      status: "Invited",
      emailId: "user1@gmail.com",
      accessLevel: "Limited",
      actions: ["resend","revoke invite"]
    },
    {
      status: "Active",
      emailId: "user2@gmail.com",
      accessLevel: "Full",
      actions: ["revoke access"]
    },
    {
      status: "Active",
      emailId: "user3@gmail.com",
      accessLevel: "Full",
      actions: ["revoke access"]
    } ,
    {
      status: "Active",
      emailId: "user4@gmail.com",
      accessLevel: "Limited",
      actions: ["revoke access"]
    }
  ];

function getUsersList(req, res, next) {
  const output = {};
  console.log("In the controller of getUsersList")
  output.status = "Success";
  output.message = "See Users list below";
  output.users = masterUsersList
   res.json(output);
}

function createUsers(req, res, next) {
const existingUsers = [];
const output = {};
  if (req.body) {
    const { emailIds, role } = req.body;
    forEach(emailIds, (emailId) => {
      // check if the user exists already
      const userObject = filter(masterUsersList, {emailId})
      if(isEmpty(userObject)){
        masterUsersList.push({
          emailId,
          accessLevel: role,
          status: userStatus.INVITED,
          actions: [actionTypes.REVOKEINVITE,actionTypes.RESEND]
        })
      } else {
        existingUsers.push(emailId);
      }

    })
    output.status = "Success";
    output.message = "User Added";
    if(!isEmpty(existingUsers)) {
      output.message = "User Added except these ids "+existingUsers+" as already existed";
    }
    res.json(output)
  } else {
    output.status = "Error";
    output.message = "User Not Added";
    res.json(output);
  }

}

function revokeUser(req, res, next) {
  const output = {}
  if (req.body) {
    const { emailId } = req.body;
    console.log("The email id to be deleted is "+emailId);
    const objectToBeDeleted = filter(masterUsersList, {emailId})
    console.log("objectToBeDeleted is ", objectToBeDeleted)
    if(!isEmpty(objectToBeDeleted)){
      for (let index = 0; index < masterUsersList.length; index++) {
        if (masterUsersList[index].emailId === emailId) {
          masterUsersList.splice(index, 1);
          break;
        }
      }
      output.status = "Success";
      output.message = "User is deleted";
      res.json(output);
    } else{
      output.status = "Error";
      output.message = "User does not exit";
      res.json(output)
    }
  } else {
    output.status = "Error";
    output.message = "User cannot be deleted";
    res.json(output)
  }

}

function resendInvite(req, res, next) {
  const output = {}
  if (req.body) {
    const { emailId } = req.body;
    console.log("The email id to be which resendInvite is "+emailId);
    const objectToBeReinvited = filter(masterUsersList, {emailId, status: userStatus.INVITED})
    console.log("objectToBeReinvited is ", objectToBeReinvited)
    if(!isEmpty(objectToBeReinvited)){
      console.log(" The user invitation has been resent")
      output.status = "Success";
      output.message = " The user invitation has been resent"
      res.json(output);
    } else{
      output.status = "Error";
      output.message = "Either User does not exit or User is already active, so cannot be  reinvited"
      res.json(output)
    }
  } else {
    output.status = "Error";
    output.message = "User does not exit, so cannot be  reinvited";
    res.json(output)
  }

}

module.exports = {
  getUsersList,
  createUsers,
  revokeUser,
  resendInvite
}
