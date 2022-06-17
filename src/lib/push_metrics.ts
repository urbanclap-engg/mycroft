import { Error } from './common/error';
import { MetricAggregator } from './metric_aggregator';
import { Logger } from './common/logger';


async function pushMetric(
  storeName: string,
  jobName: string
){
  try {
    await MetricAggregator.pushMetric(storeName, jobName);
  } catch (err) {
    Logger.error({
      error_type: err.error_type,
      error_message: err.error_message,
      error_stack: err.error_stack
    });
  }
}

export { pushMetric };