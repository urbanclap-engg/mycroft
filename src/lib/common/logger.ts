'use strict';

import { MError } from './error/mycroft_error';

const loggerInstance = require('@uc-engg/logging-repo').initLogger(
  process.env.LOG_INDEX_NAME
);
const LOG_TYPE = 'mycroft';

function info(data: Object) {
  loggerInstance.info({
    ...data,
    log_type: LOG_TYPE
  });
}

function error(error: MError, data?: Object) {
  loggerInstance.error({
    ...data,
    log_type: LOG_TYPE,
    error_type: error.error_type,
    error_message: error.error_message,
    ...(error.error_stack && { error_stack: JSON.stringify(error.error_stack) })
  });
}

export const Logger = {
  info,
  error
};
