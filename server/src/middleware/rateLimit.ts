import rateLimit from "express-rate-limit";

//login protection
export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, //only 5 login attempts
  message: {
    success: false,
    message: "Too many login attempts, Try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

//contact protection
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mintues
  max: 10, // max 10 messages
  message: {
    success: false,
    message: "Too many messages sent, Please try later.",
  },
});
