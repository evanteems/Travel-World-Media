module.exports.validateRegisteredInputs = (username, password, confirmPassword) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Your username was forgotten...';
    }
    if (password === '') {
        errors.password = 'Please dont leave this empty, you might get hacked. Possibly... :3.';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'This the passowrd you were lookig for bud... NOT!!';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'You forgot your username? Funny...';
    }
    if (password,trim() === '') {
        errors.password = 'Forgot that password huh?';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
