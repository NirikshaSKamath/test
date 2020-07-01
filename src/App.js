import React from 'react';
import './App.css';
import AnyChart from '../node_modules/anychart-react/dist/anychart-react.min.js';
import anychart from 'anychart'

function App() {
  var msftDataTable = anychart.data.table();
  // anychart.theme('darkBlue');
  // anychart.theme(null);
  msftDataTable.addData(window.get_msft_daily_short_data());
  // const data = [[1317888000000, 372.5101, 375, 372.2, 372.52, 44487700],
  // [1317888060000, 372.4, 373, 372.01, 372.16, 67333696],
  // [1317888120000, 372.16, 372.4, 371.39, 371.62, 371.62, 46950800],
  // [1317888180000, 371.62, 372.16, 371.55, 371.75, 371.75, 54298200],
  // [1317888240000, 371.75, 372.4, 371.57, 372, 372, 58810800],
  // [1317888300000, 372, 372.3, 371.8, 372.24, 67079900],
  // ]
  msftDataTable.addData(window.get_msft_daily_short_data());
  // msftDataTable.addData(data);

  var color1 = [255, 0, 0];
  var color2 = [0, 0, 255];


  var mixColor1 = anychart.color.blend(color1, color2, 0.2);
  // map loaded data for the ohlc series
  var mapping = msftDataTable.mapAs({
    open: 1,
    high: 2,
    low: 3,
    close: 4,
  });

  // map loaded data for the scroller
  var scrollerMapping = msftDataTable.mapAs();
  scrollerMapping.addField('value', 5);

  // create stock chart
  var chart = anychart.stock();
  // chart.background().stroke({
  //   keys: [".1 red", ".5 yellow", ".9 blue"],
  //   angle: 45,
  //   thickness: 5
  // });
  // chart.background().fill({
  //   keys: ["#fff", "#66f", "#fff"],
  //   angle: 130,
  // });

  // create first plot on the chart
  var plot = chart.plot(0);
  // set grid settings
  plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

  // create EMA indicators with period 50
  plot
    .ema(msftDataTable.mapAs({ value: 4 }))
    .series()
    .stroke('1.5 #455a64');

  var series = plot.candlestick(mapping);
  series.name('CSCO');
  series.legendItem().iconType('rising-falling');

  // create scroller series with mapped data
  chart.scroller().candlestick(mapping);

  // set chart selected date/time range
  chart.selectRange('2007-01-03', '2007-05-20');

  // var chart = anychart.stock();
  // var firstPlot = chart.plot(0);
  // firstPlot.area(msftDataTable.mapAs({ 'value': 4 })).name('MSFT');
  return (
    <div className="App">
      <AnyChart
        width={800}
        height={600}
        instance={chart}
        title="Stock demo"
        color={mixColor1}
      />
    </div>
  );
}

export default App;
