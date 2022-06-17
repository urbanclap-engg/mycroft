import { Error } from '../../../src/lib/common/error';
import { registerMetric } from '../../../src/lib/register_metrics';

describe('test metric registration', () => {
  test('counter metric registration with not registered store', () => {
    const storeName = 'store-1';
    const metric = {
      name: 'counter-metric',
      labelNames: ['label1', 'label2'],
      help: 'this is a counter metric'
    };

    expect(() => registerMetric
      .counter(storeName, metric))
      .toThrow(new Error.MycroftError(Error.Constants.MAX_LABELS_ERROR));
  });

  test('counter metric registration with more than 10 labels', () => {
    const storeName = 'store-1';
    const metric = {
      name: 'counter-metric',
      labelNames: ['label1', 'label2', 'label3', 'label1',
        'label2', 'label3', 'label1', 'label2',
        'label3', 'label1', 'label2', 'label3'],
      help: 'this is a counter metric'
    }

    expect(() => registerMetric
      .counter(storeName, metric))
      .toThrow(new Error.MycroftError(Error.Constants.STORE_UNDEFINED_ERROR));
  });

  test('gauge metric registration with not registered store', () => {
    const storeName = 'store-1';
    const metric = {
      name: 'gauge-metric',
      labelNames: ['label1', 'label2'],
      help: 'this is a gauge metric'
    };

    expect(() => registerMetric
      .gauge(storeName, metric))
      .toThrow(new Error.MycroftError(Error.Constants.MAX_LABELS_ERROR));
  });

  test('gauge metric registration with more than 10 labels', () => {
    const storeName = 'store-1';
    const metric = {
      name: 'gauge-metric',
      labelNames: ['label1', 'label2', 'label3', 'label1',
        'label2', 'label3', 'label1', 'label2',
        'label3', 'label1', 'label2', 'label3'],
      help: 'this is a gauge metric'
    }

    expect(() => registerMetric
      .gauge(storeName, metric))
      .toThrow(new Error.MycroftError(Error.Constants.STORE_UNDEFINED_ERROR));
  });

  test('histogram metric registration with not registered store', () => {
    const storeName = 'store-1';
    const metric = {
      name: 'histogram-metric',
      labelNames: ['label1', 'label2'],
      help: 'this is a histogram metric'
    };

    expect(() => registerMetric
      .histogram(storeName, metric))
      .toThrow(new Error.MycroftError(Error.Constants.MAX_LABELS_ERROR));
  });

  test('histogram metric registration with more than 10 labels', () => {
    const storeName = 'store-1';
    const metric = {
      name: 'histogram-metric',
      labelNames: ['label1', 'label2', 'label3', 'label1',
        'label2', 'label3', 'label1', 'label2',
        'label3', 'label1', 'label2', 'label3'],
      help: 'this is a histogram metric'
    }

    expect(() => registerMetric
      .histogram(storeName, metric))
      .toThrow(new Error.MycroftError(Error.Constants.STORE_UNDEFINED_ERROR));
  });
});

