'use strict';

import { Error } from './common/error';
import { Metric } from './common/metric_types';
import { State } from './common/state';
import { isMonitoringEnabled } from './common/util';
import { Validator } from './common/validator';
import { MetricAggregator } from './metric_aggregator';

function registerCounterMetric(storeName: string, metric: Metric) {
  if (!isMonitoringEnabled()) return;

  Validator.isStoreRegistered(storeName);
  Validator.labelCount(storeName, metric.labelNames);

  const store = State.getStore(storeName);

  try {
    MetricAggregator.createCounterMetric(store, metric);
  } catch (err) {
    throw new Error.MycroftError({
      error_type: Error.Constants.METRIC_REGISTRATION_ERROR,
      error_message: err.message,
      error_stack: err.stack
    });
  }
}

function registerGaugeMetric(storeName: string, metric: Metric) {
  if (!isMonitoringEnabled()) return;

  Validator.isStoreRegistered(storeName);
  Validator.labelCount(storeName, metric.labelNames);

  const store = State.getStore(storeName);

  try {
    MetricAggregator.createGaugeMetric(store, metric);
  } catch (err) {
    throw new Error.MycroftError({
      error_type: Error.Constants.METRIC_REGISTRATION_ERROR,
      error_message: err.message,
      error_stack: err.stack
    });
  }
}

function registerHistogramMetric(storeName: string, metric: Metric) {
  if (!isMonitoringEnabled()) return;

  Validator.isStoreRegistered(storeName);
  Validator.labelCount(storeName, metric.labelNames);

  const store = State.getStore(storeName);

  try {
    MetricAggregator.createHistogramMetric(store, metric);
  } catch (err) {
    throw new Error.MycroftError({
      error_type: Error.Constants.METRIC_REGISTRATION_ERROR,
      error_message: err.message,
      error_stack: err.stack
    });
  }
}

export const registerMetric = {
  counter: registerCounterMetric,
  gauge: registerGaugeMetric,
  histogram: registerHistogramMetric
};
