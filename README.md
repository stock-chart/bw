API需求
=======

以下是整个K线应用的模块和API需求，页面结构请参考[bitcoinwisdom.com](https://bitcoinwisdom.com/markets/poloniex/xmrbtc)。

## HTTP接口

### 顶部信息

GET: /ticker

返回值:

```
{
  okcoinbtccny: {
    date: 1487302116,
    last: 6470,
    tid: 597851857
  },
  huobibtccny: {
    date: 1487302116,
    last: 6452,
    tid: 597851857
  },
}
```

**说明**：如果区块链123也提供其他交易所的当前价格也封装到这个接口内，比如: `poloniex`, `bitfinex`, `btcc`。 属性名规则按照`[交易所名][数字货币名][法币名]`的格式，
如: `poloniexbtcusd`指`poloniex`交易所的`btc/usd`交易，`btccbtccny`指btcc交易所的`btc/cny`交易。

### K线部分

GET: /period

返回值:

```
[
  [
    1487289600,     // timestamp
    8079644,
    8081013,
    0.01272501,     // open
    0.01268079,     // close
    0.01275888,     // high
    0.01262001,     // low
    6570.66594834,  // xmr volume
    3780.55,        //
    2790.12,        //
    83.3839         // btc volume
  ],
]
```

### 交易深度

GET: /depth

返回值:

```
{
  result: "success",
  return: {
    asks: [
      [
        0.01269467,    // price
        0.56753982     // volume
      ],
    ],
    bids: [
      [
        0.01266001,    // price
        25.4917        // volume
      ],
    ]
  }
}
```

### 最近成交

API: /trade

返回值:

```
[
  {
    tid: 8082203,
    amount: 0.02119171,  // volume
    date: 1487314862,    // timestamp
    price: 0.012858,     // price
    trade_type: "bid"    // "ask" 或 "bid"
  },
]
```

----

### WebSocket

参数形式: ?symbol=poloniexxmrbtc

返回值:

- 深度数据
  ```
  {
    ok: 1,
    sdepth: {
      now: 1487315844,
      result: "success",
      return: {
        asks: [
          [
            0.01269467,    // price
            0.56753982     // volume
          ],
        ],
        bids: [
          [
            0.01266001,    // price
            25.4917        // volume
          ],
        ]
      }
    },
    type: "sdepth"
  }
  ```
- 交易数据
  ```
  {
    ok: 1,
    trades: [
      {
        amount: 0.02906809,
        date: 1487315616,
        price: 0.01289999,
        tid: 8082517,
        trade_type: "bid"  // "ask" 或 "bid"
      },
    ],
    type: "trades"
  }
  ```

## 预警

- 选择交易所
  * okcoin
    - okcoin_btc_cny
    - okcoin_ltc_cny
  * huobi
    - huobi_btc_cny
    - huobi_ltc_cny
  * btcc
    - btcc_btc_cny
    - btcc_ltc_cny
  * yunbi
    - yunbi_btc_cny
    - yunbi_eth_cny
- 选择币种
- 选择更新间隔
  * 1s
  * 2s
  * 5s
  * 60s

- localStorage
  * exchange: poloniex
  * symbol: poloniex_dcr_btc

```js
// 本地数据
const INITIAL_STATS = {
  alertList: [
    {
      symbol: 'poloniex_btc_usd',
      type: 'lt'
    },
    {
      symbol: 'bitfinex_eth_btc',
      type: 'gt'
    }
  ],
  duration: '3s'
}

var duration = INITIAL_STATS.duration

// ============================================================================

// 前端轮询
var intervalId = setInterval(function() {

  // "更新时间间隔"改变
  if (duration !== INITIAL_STATS.duration) {
    duration = INITIAL_STATS.duration
    intervalId = null
  }
  
  $.get(`/ticker`, {
    symbols: ['poloniex_btc_cny', 'poloniex_dcr_btc', 'bitfinex_eth_usd']
  })
  .then(function(res) {
    res.data.forEach(function(item) {
      // TODO
    })
  })
}.bind(this), duration)

// ============================================================================

// 后端API
router.get('/', function(req, res) {
  var symbols = req.body.symbols
  
  Promise.all(symbols.map(function(symbol) {
    request(`${BASE_URL}/ticker?symbol=${symbol}`)
  })).then(function(data) {
    var ret = {}
    data.map(function(item) {
      ret[item.symbol] = item.last
    })
    
    res.json(ret)
  })
})
```
