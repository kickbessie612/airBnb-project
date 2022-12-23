// backend/routes/api/users.js
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;
  const existEmail = await User.findOne({ where: { email } });
  const existUser = await User.findOne({ where: { username } });
  if (existEmail || existUser) {
    const error = new Error('User already exists');
    error.status = 403;
    error.errors = {};
    if (existEmail) {
      error.errors.email = 'User with that email already exists';
    }
    if (existUser) {
      error.errors.username = 'User with that username already exists';
    }
    return next(error);
  }

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password
  });

  await setTokenCookie(res, user);

  return res.json({
    user
  });
});

module.exports = router;
