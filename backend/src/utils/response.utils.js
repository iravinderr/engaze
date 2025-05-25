export const errorRes = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        data
    });
}

export const successRes = (res, message, data = null) => {
    return res.status(200).json({
        success: true,
        message,
        data
    });
}