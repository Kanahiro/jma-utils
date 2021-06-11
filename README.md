# jma-utils - 気象庁データユーティリティ

## インストール

```
npm install jma-utils
```

## ナウキャスト

### getTimeData(): Promise<TimeData>

配信されているタイルの時系列情報を取得する

### getXyzTime(timeData:TimeData): TileUrlData

時系列情報から、有効な XYZ タイル URL を生成する

```typescript
import { nowcast } from 'jma-utils';

const timeData = await nowcast.getTimeData();
/**
{
  now: {
    basetime: '20210611150000',
    validtime: '20210611150000',
    elements: [ 'hrpns', 'hrpns_nd' ]
  },
  past: [
    {
      basetime: '20210611120000',
      validtime: '20210611120000',
      elements: [Array]
    },
    // ...昇順が保証されます
  ],
  forecast: [
    {
      basetime: '20210611150000',
      validtime: '20210611150500',
      elements: [Array]
    },
    // ...昇順が保証されます
  ]
}
*/

const tileUrlData = nowcast.getXyzTileUrlData(timeData);
/**
{
  now: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/20210611150500/none/20210611150500/surf/hrpns/{z}/{x}/{y}.png',
  past: [
    'https://www.jma.go.jp/bosai/jmatile/data/nowc/20210611120500/none/20210611120500/surf/hrpns/{z}/{x}/{y}.png',
    // ...
    'https://www.jma.go.jp/bosai/jmatile/data/nowc/20210611150000/none/20210611150000/surf/hrpns/{z}/{x}/{y}.png'
  ],
  forecast: [
    'https://www.jma.go.jp/bosai/jmatile/data/nowc/20210611150000/none/20210611150500/surf/hrpns/{z}/{x}/{y}.png',
    // ...
    'https://www.jma.go.jp/bosai/jmatile/data/nowc/20210611150000/none/20210611160000/surf/hrpns/{z}/{x}/{y}.png'
  ]
}
 */
```
