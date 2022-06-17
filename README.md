# Monitoring Client for NodeJS
* Easy to create store where user can measure custom metrics.
* Default metrics of node can be measured
* Default labels can be set for all metrics
* Supported custom metrics : Counter, Gauge and Histogram 

## Functions
* **createStore :**
    - Used to create store which is further used to register custom metrics
    - Params 
      - store name 
      - defaultLabels : labels that are added to every metrics
      - isCollectNodeMetrics : to add node server metrics to given store

* **registerMetric :**
    - Used to register metric with given store
    - Params : store name for given metric and metric properties

* **exportMetrics :**
    - Used to get all the metrics in prometheus exposition format with contentType
    - Params : store name for which metrics are required

## Usage
* Create store (with default labels and node metrics)
    ```
    Mycroft.createStore({
      storeName: 'store-name',
      defaultLabels: defaultLabels,
      isCollectNodeMetrics: true
    });
    ```

* Register custom counter metric for a give store
    ```
    Mycroft.registerMetric.counter('store_1', {  
      name: 'counter-metric', 
      labelNames: ['label_1'], 
      help: 'help message' 
    });
    ```

* Measure custom metric for a given store
    ```
    Mycroft.incMetric('store_1', 'counter_metric', {
      label_1: 'label_1'
    });
    ```
* Export metrics for a given store
    ```
    Mycroft.exportMetrics('store_1');
    ```

    returns
    ``` 
    {
      metrics : 'all metrics in prometheus exposition format'
      contentType: 'content type information'
    }
    
    ```

## Instrumenting
Three types of metric are offered: Counter, Gauge and Histogram. 

### Counter
Use it to monitor metrics which gets incremented by only one and further analysis can be performed based on the value. Example => number of errors occurred for http service request

```
Mycroft.registerMetric.counter('store_1', {  
  name: 'http_request_error_metric', 
  labelNames: ['service', 'route', 'error_type'], 
  help: 'Count of errors' 
});

Mycroft.incMetric('store_1', 'http_request_error_metric', {
  service: 'service_1',
  route: '/functionCall',
  error_type: 'null pointer exception'
});
```

### Gauge
Use it to monitor metrics which can vary at any time. Example => how much time it took to complete a request. If you want the granular details like 95% or 99% percentile use Histogram.
```
Mycroft.registerMetric.gauge('store_1', {  
  name: 'http_request_lag_metric', 
  labelNames: ['service', 'route'], 
  help: 'Time took to complete service in ms' 
});

Mycroft.setMetric('store_1', 'http_request_lag_duration_millisecond', {
  service: 'service_1',
  route: '/functionCall'
}, 1000);
```

### Histogram
Use it to track the size and number of events in buckets. This allows for aggregative calculation of quantiles. Caution : Using histogram can make the cardinality very high as buckets are stored as one label in metric itself.  

```
Mycroft.registerMetric.histogram('store_1', {  
  name: 'http_request_lag_metric', 
  labelNames: ['service', 'route'], 
  help: 'Time took to complete service in ms',
  buckets: [50, 100, 200, 400, 600, 1000, 5000, 10000, 30000, 60000] 
});

Mycroft.setMetric('store_1', 'http_request_lag_duration_millisecond', {
  service: 'service_1',
  route: '/functionCall'
}, 1000);
```