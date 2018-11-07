function success(data) {
    return {
        code: '000000',
        mesg: '处理成功',
        data: data
    }
}

function fail(code, mesg, data) {
    return {
        code: code,
        mesg: mesg,
        data: data
    }
}

module.exports = {
    success: success,
    fail: fail
}