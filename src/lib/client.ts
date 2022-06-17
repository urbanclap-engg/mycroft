'use strict';

import { Error } from './common/error';
import { Logger } from './common/logger';
import { State } from './common/state';
import { isMonitoringEnabled } from './common/util';
import { MetricAggregator } from './metric_aggregator';

function createStore(params: {
  storeName: string;
  defaultLabels?: Object;
  isCollectNodeMetrics?: boolean;
}) {
  try {
    if (!isMonitoringEnabled()) return;

    const store = State.setStore(params.storeName, params.defaultLabels);

    if (params.isCollectNodeMetrics) {
      MetricAggregator.collectNodeMetrics(store);
    }
    Logger.info({
      message: `Store - ${params.storeName} successfully created`
    });
  } catch (err) {
    throw new Error.MycroftError({
      error_type: Error.Constants.STORE_INITIALIZATION_ERROR,
      error_message: err.message,
      error_stack: err.stack
    });
  }
}

export { createStore };
