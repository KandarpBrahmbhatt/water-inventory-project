import { body } from 'express-validator'

export const signupValidator = [
    body("name")
        .notEmpty().withMessage("Name is required")
        // .length({ min: 3 }).withMessage("Name must be ateast 3 charector")
        .trim(),

    body("email")
        .notEmpty().withMessage("Email is Required")
        .isEmail().withMessage("invalid email format")
        .normalizeEmail(), // Clean it before saving 

    body("password")
        .notEmpty().withMessage("password is required")
]


export const loginValidator = [
    body("email")
        .notEmpty().withMessage("Email is requrired")
        .isEmail().withMessage("invalid email formate")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
]