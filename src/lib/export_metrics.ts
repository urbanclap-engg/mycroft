'use strict';

import { State } from './common/state';
import { Validator } from './common/validator';
import { MetricsData } from './metric_aggregator/types';
import { MetricAggregator } from './metric_aggregator';
import { isMonitoringEnabled } from './common/util';

function exportMetrics(storeName: string): MetricsData {
  if (!isMonitoringEnabled()) {
    return {
      metrics: '',
      contentType: MetricAggregator.getContentType()
    };
  }

  Validator.isStoreRegistered(storeName);

  const store = State.getStore(storeName);
  const metrics = MetricAggregator.getMetrics(store);
  const contentType = MetricAggregator.getContentType();

  return {
    metrics: metrics,
    contentType: contentType
  };
}

export { exportMetrics };
