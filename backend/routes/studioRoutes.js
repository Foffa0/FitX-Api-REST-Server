const express = require('express')
const router = express.Router()
const { getStudios, setStudio, updateStudio, deleteStudio } = require = require('../controllers/studioController')

router.route('/').get(getStudios).post(setStudio)

router.route('/:id').delete(deleteStudio).put(updateStudio)

module.exports = router