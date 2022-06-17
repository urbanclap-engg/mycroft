'use strict';

import { MetricAggregator } from '../metric_aggregator';
import { Store } from '../metric_aggregator/types';
import { MetricWrapper } from './metric_types';

const stores: Map<String, Store> = new Map();

function getDefaultLabels(storeName: string): Object {
  if (isStoreExist(storeName)) {
    return Object.assign({}, getStore(storeName).defaultLabels);
  }
  return {};
}

function setStore(name: string, defaultLabels: Object): Store {
  if (!stores.has(name)) {
    stores.set(name, MetricAggregator.createRegistry(defaultLabels));
  }

  return stores.get(name);
}

function getStore(name: string): Store {
  return stores.get(name);
}

function isStoreExist(name: string): boolean {
  return stores.has(name);
}

function isMetricExist(storeName: string, metricName: string): boolean {
  return stores.get(storeName).metrics.has(metricName);
}

function getMetric(storeName: String, metricName: String): MetricWrapper {
  return stores.get(storeName).metrics.get(metricName);
}

export const State = {
  getDefaultLabels,
  setStore,
  getStore,
  isStoreExist,
  isMetricExist,
  getMetric
};
