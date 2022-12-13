class ResponseHelper{
        success(res, data, statuscode = 200){
        let resPayload = {
            status: true,
            message: data.message,
            data: data.payload
        }
        res.status(statuscode).send(resPayload)
    }
    error(res, data, statusCode = 406) {
        let resPayload = {
            status: false,
            message: data.message,
            data:  data.payload
        }
        res.status(statusCode).send(resPayload);
    }
}
export default new ResponseHelper;