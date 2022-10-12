const { default: Register } = require('../../client/src/pages/Register')

const router = require('express').Router()

router.get('/', Register)