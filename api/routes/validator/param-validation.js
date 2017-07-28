const Joi = require("joi");
const values = require("lodash/values");

const accessLevels = require("../../enums/access-levels");
const accessLevelsValues = values(accessLevels);


const emailIdsSchema = Joi.string().email().min(1).required();

const emailIdsArraySchema = Joi.array().items(emailIdsSchema).required();


module.exports = {
  addUsers: {
    body: {
      emailIds: Joi.alternatives().try(emailIdsSchema, emailIdsArraySchema).required(),
      role: Joi.string().valid(accessLevelsValues).required()
    }
  },
  revokeUser: {
    body: {
      emailId: Joi.string().email().required()
    }
  },
  resendInvite: {
    body: {
      emailId: Joi.string().email().required()
    }
  }
}
