const errorHandler = (err) => {
    console.log(err.message);
    let errors = { login: "", password: "" };

    // duplication handling
    if (err.code === 11000) {
        errors.login = "That login is already registered";
        return errors;
    }

    // wrong email
    if (err.message === 'Incorrect login') {
        errors.login = 'That login is not registered';
    }

    // wrong password
    if (err.message === 'Incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // validation
    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

module.exports = errorHandler;
