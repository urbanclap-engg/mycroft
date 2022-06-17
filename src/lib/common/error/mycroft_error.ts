'use strict';

interface MError {
  error_type: string;
  error_message: string;
  error_stack?: string;
}

class MycroftError extends Error {
  error_type: string;
  error_message: string;
  error_stack?: string;

  constructor(error: MError) {
    super();

    this.error_type = error.error_type;
    this.error_message = error.error_message;

    if (error.error_stack) this.error_stack = error.error_stack;
  }
}

export { MycroftError, MError };
