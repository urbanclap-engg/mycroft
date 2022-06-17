import { Error } from '../../../src/lib/common/error';
import { State } from '../../../src/lib/common/state';
import { exportMetrics } from '../../../src/lib/export_metrics';
import { MetricAggregator } from '../../../src/lib/metric_aggregator';

describe('test export metrics', () => {
  test('store is not defined', () => {
    const storeName = 'store-1';

    State.isStoreExist = jest.fn().mockReturnValue(false);

    expect(() => exportMetrics(storeName))
      .toThrow(new Error.MycroftError(Error.Constants.STORE_UNDEFINED_ERROR));
  });

  test('data should not be tempered', () => {
    const storeName = 'store-1';

    State.isStoreExist = jest.fn().mockReturnValue(true);
    MetricAggregator.getMetrics = jest.fn().mockReturnValue('Metrics captured');
    MetricAggregator.getContentType = jest.fn().mockReturnValue('text/Plain');

    const exportedMetrics = exportMetrics(storeName);

    expect(exportedMetrics).toEqual({
      metrics: 'Metrics captured',
      contentType: 'text/Plain'
    })
  });
});

