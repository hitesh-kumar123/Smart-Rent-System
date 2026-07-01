const rateLimit = require("express-rate-limit");

const createRateLimiter = ({ windowMs, max, message }) =>
    rateLimit({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            res.status(429).json({ message });
        },
    });

const authLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: "Too many attempts from this IP, please try again after 15 minutes.",
});

const forgotPasswordLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message:
        "Too many password reset requests from this IP. Please try again later.",
});

module.exports = {
    authLimiter,
    forgotPasswordLimiter,
};
