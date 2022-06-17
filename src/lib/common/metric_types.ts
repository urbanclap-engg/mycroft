'use strict';

interface Metric {
  name: string;
  labelNames: string[];
  help: string;
  callback?: any;
  buckets?: number[];
}

interface MetricWrapper extends Metric {
  promMetric: any;
  type: MetricType;
}

enum MetricType {
  Counter,
  Gauge,
  Histogram
}

export { Metric, MetricWrapper, MetricType };
