'use strict';

import { State } from './state';
import { Constants } from '../metric_aggregator/constants'

function defaultLabelCount(storeName: string): number {
  const defaultLabels = State.getDefaultLabels(storeName);

  if (defaultLabels) {
    return Object.keys(defaultLabels).length;
  }

  return 0;
}

function isMonitoringEnabled() {
  return process.env.MYCROFT_MONITORING_ENABLED == 'true';
}

function getCurrentEnvironment() {
  return process.env.NODE_ENV || Constants.DEFAULT_ENV;
}

function getPushGatewayUrl() {
  return process.env.PUSHGATEWAY_URL;
}

export { defaultLabelCount, isMonitoringEnabled, getCurrentEnvironment, getPushGatewayUrl };
