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
