// Username validation
export const valid_username = (str: string): boolean => {
    return str.length >= 8 && str.length <= 15 && /^[A-Za-z0-9]*$/.test(str);
};

// Password validation
export const valid_password = (str: string): boolean => {
    // Check for bcrypt hash format (hashed passwords are allowed)
    if (/^\$2[ayb]\$.{56}$/.test(str)) return true;

    // Ensure password is between 8 and 20 characters
    if (str.length < 8 || str.length > 20) return false;

    // Ensure at least one uppercase, one lowercase, one digit, and one special character
    if (!/[A-Z]/.test(str) || !/[a-z]/.test(str) || !/[0-9]/.test(str) || !/[!@#$%^&*]/.test(str)) {
        return false;
    }

    // Ensure no invalid characters are present
    return /^[A-Za-z0-9!@#$%^&*]*$/.test(str);
};


// Email validation
export const valid_email = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};

// Phone number validation (exactly 10 digits)
export const valid_phone_number = (number: string): boolean => {
    return /^\d{10}$/.test(number);
};

// Address validation
export const valid_address = (str: string): boolean => {
    return str.length >= 5;
};

// Role validation (additional utility for role-checking, if needed)
export const valid_role = (role: string): boolean => {
    const validRoles = ['customer', 'admin'];
    return validRoles.includes(role);
};