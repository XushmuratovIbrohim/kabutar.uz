import { body } from "express-validator"

export const registerValidations = [
    body('password').isLength({min: 3, max: 12 }),
    body('username').isLength({min: 3 }),
    body('phoneNumber').isNumeric()
]

export const loginValidations = [
    body('password').isLength({min: 3, max: 12 }),
    body('phoneNumber').isNumeric()
]