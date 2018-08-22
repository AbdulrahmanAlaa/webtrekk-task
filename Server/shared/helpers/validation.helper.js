module.exports = {
    minLength: (field, minLength) => `${field} shall be at least ${minLength} characters`,
    maxLength: (field, minLength) => `${field} shall not exceed ${minLength} characters`
} 