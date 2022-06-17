'use strict';

import { State } from '../state';
import { MetricWrapper, MetricType } from '../metric_types';
import { defaultLabelCount } from '../util';
import { Error } from '../error';
import { Logger } from '../logger';
import { METRICS } from './constant';

function labelCount(storeName: string, labels: string[]) {
  if (labels.length + defaultLabelCount(storeName) > METRICS.MAX_LABELS) {
    Logger.error(Error.Constants.MAX_LABELS_ERROR);

    throw new Error.MycroftError(Error.Constants.MAX_LABELS_ERROR);
  }
}

function isStoreRegistered(name: string) {
  if (!State.isStoreExist(name)) {
    Logger.error(Error.Constants.STORE_UNDEFINED_ERROR);

    throw new Error.MycroftError(Error.Constants.STORE_UNDEFINED_ERROR);
  }
}

function isMetricRegistered(storeName: string, metricName: string) {
  if (!State.isMetricExist(storeName, metricName)) {
    Logger.error(Error.Constants.METRIC_UNDEFINED_ERROR);

    throw new Error.MycroftError(Error.Constants.METRIC_UNDEFINED_ERROR);
  }
}

function canMetricInc(metric: MetricWrapper) {
  if (metric.type === MetricType.Histogram) {
    Logger.error(Error.Constants.OPERATION_NOT_SUPPORTED_ERROR, {
      message: "Metric can't be incremented"
    });

    throw new Error.MycroftError(Error.Constants.OPERATION_NOT_SUPPORTED_ERROR);
  }
}

function canMetricDec(metric: MetricWrapper) {
  if (
    metric.type === MetricType.Histogram ||
    metric.type === MetricType.Counter
  ) {
    Logger.error(Error.Constants.OPERATION_NOT_SUPPORTED_ERROR, {
      message: "Metric can't be decremented"
    });

    throw new Error.MycroftError(Error.Constants.OPERATION_NOT_SUPPORTED_ERROR);
  }
}

function canMetricSet(metric: MetricWrapper) {
  if (metric.type === MetricType.Counter) {
    Logger.error(Error.Constants.OPERATION_NOT_SUPPORTED_ERROR, {
      message: "Metric can't be set"
    });

    throw new Error.MycroftError(Error.Constants.OPERATION_NOT_SUPPORTED_ERROR);
  }
}

export const Validator = {
  labelCount,
  isStoreRegistered,
  isMetricRegistered,
  canMetricInc,
  canMetricDec,
  canMetricSet
};
