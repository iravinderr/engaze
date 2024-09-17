export const ErrorResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        data
    });
}

export const SuccessResponse = (res, message, data = null) => {
    return res.status(200).json({
        success: true,
        message,
        data
    });
}