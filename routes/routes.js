const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/affectedCountries',controller.getAffectedCountries)
router.get('/casesByCountry',controller.casesByCountry)
router.get('/:country',controller.geoCoder)

module.exports = router