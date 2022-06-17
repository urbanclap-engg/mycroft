import { incMetric, decMetric, setMetric } from '../../../src/lib/measure_metrics';
import { State } from '../../../src/lib/common/state';
import { Error } from '../../../src/lib/common/error';
import { MetricType } from '../../../src/lib/common/metric_types';

describe('test metric capture', () => {
  test('metric not defined', () => {
    const storeName = 'store-1';
    const metricName = 'metric-1';
    const labels = {
      label: 'label'
    };

    State.isMetricExist = jest.fn().mockReturnValue(false);

    expect(() => incMetric(storeName, metricName, labels))
      .toThrow(new Error.MycroftError(Error.Constants.METRIC_UNDEFINED_ERROR));
  });

  test('metric can\'t be incremented', () => {
    const storeName = 'store-1';
    const metricName = 'metric-1';
    const labels = {
      label: 'label'
    };

    State.isMetricExist = jest.fn().mockReturnValue(false);
    State.getMetric = jest.fn().mockReturnValue({type: MetricType.Histogram});

    expect(() => incMetric(storeName, metricName, labels))
      .toThrow(new Error.MycroftError(Error.Constants.OPERATION_NOT_SUPPORTED_ERROR));
  });

  test('metric can\'t be decremented', () => {
    const storeName = 'store-1';
    const metricName = 'metric-1';
    const labels = {
      label: 'label'
    };

    State.isMetricExist = jest.fn().mockReturnValue(false);
    State.getMetric = jest.fn().mockReturnValue({type: MetricType.Counter});

    expect(() => decMetric(storeName, metricName, labels))
      .toThrow(new Error.MycroftError(Error.Constants.OPERATION_NOT_SUPPORTED_ERROR));
  });

  test('metric can\'t be set', () => {
    const storeName = 'store-1';
    const metricName = 'metric-1';
    const labels = {
      label: 'label'
    };

    State.isMetricExist = jest.fn().mockReturnValue(false);
    State.getMetric = jest.fn().mockReturnValue({type: MetricType.Counter});

    expect(() => setMetric(storeName, metricName, labels, 1))
      .toThrow(new Error.MycroftError(Error.Constants.OPERATION_NOT_SUPPORTED_ERROR));
  });
});

