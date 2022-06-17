'use strict';

import { MetricWrapper } from '../common/metric_types';
import { Registry } from 'prom-client';

interface Store {
  registry: Registry;
  metrics: Map<String, MetricWrapper>;
  defaultLabels: Object;
}

interface MetricsData {
  metrics: string;
  contentType: string;
}

interface MetricAggregator {
  createRegistry: Function;
  collectNodeMetrics: Function;
  createCounterMetric: Function;
  createGaugeMetric: Function;
  createHistogramMetric: Function;
  getMetrics: Function;
  getContentType: Function;
  setMetric: Function;
  incMetric: Function;
  decMetric: Function;
  pushMetric: Function;
}

export { Store, MetricsData, MetricAggregator };
