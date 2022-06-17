'use strict';

const MAX_LABELS_ERROR = {
  error_type: 'max_labels_error',
  error_message: 'max 10 labels are allowed'
};

const STORE_UNDEFINED_ERROR = {
  error_type: 'store_undefined_error',
  error_message: 'store undefined, use createStore method to create one'
};

const METRIC_UNDEFINED_ERROR = {
  error_type: 'metric_undefined_error',
  error_message: 'metric undefined, register given metric with given store'
};

const OPERATION_NOT_SUPPORTED_ERROR = {
  error_type: 'operation_not_supported_error',
  error_message: 'operation is not supported for given metric'
};

const STORE_INITIALIZATION_ERROR = 'store_initialization_error';
const METRIC_REGISTRATION_ERROR = 'metric_registration_error';
const METRIC_CAPTURE_ERROR = 'metric_capture_error';
const METRIC_PUSH_ERROR = 'metric_push_error'

export const Constants = {
  MAX_LABELS_ERROR,
  STORE_UNDEFINED_ERROR,
  METRIC_UNDEFINED_ERROR,
  OPERATION_NOT_SUPPORTED_ERROR,
  STORE_INITIALIZATION_ERROR,
  METRIC_REGISTRATION_ERROR,
  METRIC_CAPTURE_ERROR,
  METRIC_PUSH_ERROR
};
