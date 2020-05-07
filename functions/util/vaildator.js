
const isEmail = (email) => {
    const regEx = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (email.match(regEx)) return true;
    else return false;
}

const isEmpty = (string) => {
    if (string.trim() === "") return true;
    else return false;
}

exports.validateSignupData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = "Email must not be empty ";
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a vaild email address';
    }

    if (isEmpty(data.password)) errors.password = "Must not be empty";
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords must match";
    if (isEmpty(data.handle)) errors.handle = "Must not be empty";

    return {
        errors,
        vaild: Object.keys(errors).length === 0 ? true : false,
    }

}

exports.validateLoginData = (userData) => {

    let errors = {};

    if (isEmpty(userData.email)) { errors.email = "Must not be empty "; }
    if (isEmpty(userData.password)) errors.password = "Must not be empty";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    return {
        errors,
        vaild: Object.keys(errors).length === 0 ? true : false,
    }

}

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    
    if (!isEmpty(data.website.trim())) {
        if (data.website.trim().substring !== "http") {
            userDetails.website = `http://${data.website.trim()}`;
        } else userDetails.website = data.website;
    }
    
    if (!isEmpty(data.location.trim())) userDetails.location = data.location;
    
    return userDetails;
}




