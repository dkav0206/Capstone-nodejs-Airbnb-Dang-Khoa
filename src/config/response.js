//200
const successCode = (res, data, message) => {
    res.status(200).json({
        statusCode: 200,
        message,
        content:data,
        dateTime: Date().toLocaleString()
    })
}

const successCodeAdd = (res, data, message, note) => {

    res.status(200).json({
        statusCode: 200,
        message,
        content: data,
        note,
        dateTime: Date().toLocaleString()
    })
}

//400
const failCode = (res, data, message) => {
    res.status(400).json({
        statusCode: 400,
        message,
        content:data,
        dateTime: Date().toLocaleString()
    })
}

//500
const errorCode = (res, message) => {
    res.status(500).json({
        statusCode: 500,
        message,
        dateTime: Date().toLocaleString()
    })
}

module.exports = {
    successCode,
    failCode,
    errorCode,
    successCodeAdd
}