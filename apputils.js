function sendSuccessResponse(data, res) {
    data.responecode = "0";
    res.status(200).json(data);
}

function sendFailureResponse(data, req, res, error) {
    if (error) {
        data.technicalError = error;
    }
    data.responecode = "1";
    res.status(500).json(data);
}
exports.jsonSecretKey = "JSONWEBTOKEN_SECRETKEY";
exports.sendSuccessResponse = sendSuccessResponse;
exports.sendFailureResponse = sendFailureResponse;