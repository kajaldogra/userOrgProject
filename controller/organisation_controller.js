import Organisation from "../model/organisation_model";
import responseHelper from "../helper/response_helper";

export const createOrganisation = async (req, res) => {
  const organisation = await Organisation.create(req.body);
  const resPayload = {
    message: "organisation created",
    payload: organisation,
  };
  return responseHelper.success(res, resPayload);
};

export const listOfOrg = async (req, res) => {
  const organisation = await Organisation.find({ userId: req.params.userId });
  if (organisation) {
    const resPayload = {
      message: "Organisation list of a user",
      payload: organisation,
    };
    return responseHelper.success(res, resPayload);
  }
};

export const updateOrg = async (req, res) => {
  const org = await Organisation.findById(req.params.id);
  if (!org) {
    const resPayload = {
      message: "Organisation not found",
    };
    return responseHelper.error(res, resPayload);
  }
  if (org.isActive == false) {
    const resPayload = {
      message: "Cannot update organisation information",
    };
    return responseHelper.error(res, resPayload);
  }
  const updatedOrg = await Organisation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new:true } 
  );
  console.log('updated org',updatedOrg)
  const resPayload = {
    message: "Organisation information updated",
    payload: updatedOrg,
  };
  return responseHelper.success(res, resPayload);
};


