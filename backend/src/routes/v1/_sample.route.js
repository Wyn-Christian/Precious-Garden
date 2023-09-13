const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const sampleValidation = require('../../validations/_sample.validation');
const sampleController = require('../../controllers/_sample.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageSamples'), validate(sampleValidation.createSample), sampleController.createSample)
  .get(auth('getSamples'), validate(sampleValidation.getSamples), sampleController.getSamples);

router
  .route('/:sampleId')
  .get(auth('getSamples'), validate(sampleValidation.getSample), sampleController.getSample)
  .patch(auth('manageSamples'), validate(sampleValidation.updateSample), sampleController.updateSample)
  .delete(auth('manageSamples'), validate(sampleValidation.deleteSample), sampleController.deleteSample);

module.exports = router;
