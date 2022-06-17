'use strict';

import { createStore } from './lib/client';
import { registerMetric } from './lib/register_metrics';
import { exportMetrics } from './lib/export_metrics';
import { pushMetric } from './lib/push_metrics';
import { incMetric, decMetric, setMetric } from './lib/measure_metrics';

export {
  createStore,
  registerMetric,
  exportMetrics,
  pushMetric,
  incMetric,
  decMetric,
  setMetric
};
