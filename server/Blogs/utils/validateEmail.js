"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }
}
exports.default = validateEmail;
