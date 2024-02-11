const express = require('express')
const router = express.Router()
const { getCapacityByStudioId } = require = require('../controllers/capacityWeekdayController')

router.route('/').get(getCapacityByStudioId)

module.exports = router