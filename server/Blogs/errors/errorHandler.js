"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({ message: err.message || 'An unexpected error occurred' });
}
exports.default = errorHandler;
