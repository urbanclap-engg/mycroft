'use strict';

import { Error } from './common/error';
import { Logger } from './common/logger';
import { State } from './common/state';
import { isMonitoringEnabled } from './common/util';
import { Validator } from './common/validator';
import { MetricAggregator } from './metric_aggregator';

function incMetric(storeName: string, metricName: string, labels: any) {
  if (!isMonitoringEnabled()) return;

  Validator.isMetricRegistered(storeName, metricName);
  const registeredMetric = State.getMetric(storeName, metricName);
  Validator.canMetricInc(registeredMetric);

  try {
    MetricAggregator.incMetric(registeredMetric, labels);
  } catch (err) {
    Logger.error({
      error_type: Error.Constants.METRIC_CAPTURE_ERROR,
      error_message: err.message,
      error_stack: err.stack
    });
  }
}

function decMetric(storeName: string, metricName: string, labels: any) {
  if (!isMonitoringEnabled()) return;

  Validator.isMetricRegistered(storeName, metricName);
  const registeredMetric = State.getMetric(storeName, metricName);
  Validator.canMetricDec(registeredMetric);

  try {
    MetricAggregator.decMetric(registeredMetric, labels);
  } catch (err) {
    Logger.error({
      error_type: Error.Constants.METRIC_CAPTURE_ERROR,
      error_message: err.message,
      error_stack: err.stack
    });
  }
}

function setMetric(
  storeName: string,
  metricName: string,
  labels: any,
  value: number
) {
  if (!isMonitoringEnabled()) return;

  Validator.isMetricRegistered(storeName, metricName);
  const registeredMetric = State.getMetric(storeName, metricName);
  Validator.canMetricSet(registeredMetric);

  try {
    MetricAggregator.setMetric(registeredMetric, labels, value);
  } catch (err) {
    Logger.error({
      error_type: Error.Constants.METRIC_CAPTURE_ERROR,
      error_message: err.message,
      error_stack: err.stack
    });
  }
}

export { incMetric, decMetric, setMetric };
