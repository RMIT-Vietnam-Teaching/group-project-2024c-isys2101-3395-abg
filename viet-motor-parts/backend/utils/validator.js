const valid_username = function (str) {
    return (str.length >= 8 && str.length <= 15 && (/^[A-Za-z0-9]*$/.test(str)));
}

const valid_password = function (str) {
    if (str.length < 8 || str.length > 20)
        return false;
    if (!((/[A-Z]/.test(str)) && (/[a-z]/.test(str)) && (/[0-9]/.test(str)) && (/[!@#$%^&*]/.test(str))))
        return false;
    if (!(/^[A-Za-z0-9!@#$%^&*]*$/.test(str)))
        return false;
    return true;
}

const valid_email = function (email) {
    // Basic email pattern check
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

const valid_phone_number = function (number) {
    return /^\d{10}$/.test(number);
}

const valid_address = function (str) {
    return str && str.length >= 5;
}

module.exports = { valid_username, valid_password, valid_email, valid_phone_number, valid_address }