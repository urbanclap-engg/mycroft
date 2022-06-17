'use strict';

import {
  collectDefaultMetrics as collectMetrics,
  Counter,
  Gauge,
  Histogram,
  register,
  Registry,
  Pushgateway
} from 'prom-client';
import { Metric, MetricType, MetricWrapper } from '../common/metric_types';
import { Store } from './types';
import { State } from '../common/state';
import { Constants } from './constants';
import { getCurrentEnvironment, getPushGatewayUrl } from '../common/util';
import { Error } from '../common/error';

function createRegistry(defaultLabels: Object): Store {
  const registry = new Registry();
  registry.setDefaultLabels(Object.assign({}, defaultLabels));

  return {
    registry,
    metrics: new Map(),
    defaultLabels: Object.assign({}, defaultLabels)
  };
}

function collectNodeMetrics(store: Store) {
  collectMetrics({ register: store.registry });
}

function createCounterMetric(store: Store, metric: Metric) {
  const metricProp = {
    name: metric.name,
    help: metric.help,
    labelNames: metric.labelNames,
    registers: [store.registry]
  };

  const counter = new Counter(metricProp);

  setMetricInStore(store, metric, counter, MetricType.Counter);
}

function createGaugeMetric(store: Store, metric: Metric) {
  const metricProp = {
    name: metric.name,
    help: metric.help,
    labelNames: metric.labelNames,
    registers: [store.registry]
  };

  const gauge = new Gauge(metricProp);

  setMetricInStore(store, metric, gauge, MetricType.Gauge);
}

function createHistogramMetric(store: Store, metric: Metric): any {
  const metricProps = {
    name: metric.name,
    help: metric.help,
    labelNames: metric.labelNames,
    registers: [store.registry],
    buckets: metric.buckets
  };

  if (!metric.buckets) {
    delete metricProps.buckets;
  }

  const histogram = new Histogram(metricProps);

  setMetricInStore(store, metric, histogram, MetricType.Histogram);
}

function getMetrics(store: Store): string {
  return store.registry.metrics();
}

function getContentType(): string {
  return register.contentType;
}

function setMetric(metric: MetricWrapper, labels: any, value: number) {
  if (metric.type === MetricType.Gauge) {
    metric.promMetric.set(labels, value);
  } else {
    metric.promMetric.observe(labels, value);
  }
}

function incMetric(metric: MetricWrapper, labels: any) {
  metric.promMetric.inc(labels);
}

function decMetric(metric: MetricWrapper, labels: any) {
  metric.promMetric.dec(labels);
}

function setMetricInStore(
  store: Store,
  metric: Metric,
  promMetric: any,
  type: MetricType
) {
  store.metrics.set(metric.name, {
    ...metric,
    promMetric: promMetric,
    type: type
  });
}

function getPushGateway(registry: any) {
  const gatewayUrl = getPushGatewayUrl();
  const gateway = new Pushgateway(gatewayUrl, [], registry);
  return gateway;
}

function pushMetric(
  storeName: string,
  jobName: string
) {
  const registry = State.getStore(storeName).registry;
  const gateway = getPushGateway(registry);

  return new Promise((resolve, reject) => {
    gateway.push({ jobName }, (err: Error) => {
      if (err) {
        reject(new Error.MycroftError({
          error_type: Error.Constants.METRIC_PUSH_ERROR,
          error_message: err.message,
          error_stack: err.stack
        }));
      }

      resolve({});
    });
  });
}


export {
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
