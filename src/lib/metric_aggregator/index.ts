'use strict';

import {
  createRegistry,
  createCounterMetric,
  createGaugeMetric,
  createHistogramMetric,
  collectNodeMetrics,
  getMetrics,
  getContentType,
  setMetric,
  incMetric,
  decMetric,
  pushMetric
} from './methods';
import { MetricAggregator as Aggregator } from './types';

export const MetricAggregator: Aggregator = {
  createRegistry,
  collectNodeMetrics,
  createCounterMetric,
  createGaugeMetric,
  createHistogramMetric,
  getMetrics,
  getContentType,
  setMetric,
  incMetric,
  decMetric,
  pushMetric
};
