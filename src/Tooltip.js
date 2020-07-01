import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { sixMonths } from "./data/chart6months";


export default function charts() {
    var data = sixMonths;

    // split the data set into ohlc and volume
    var ohlc = [],
        volume = [],
        dataLength = data.length,
        i = 0;

    for (i; i < dataLength; i += 1) {
        var date = new Date(data[i].T);
        var stockDate = date.getTime();
        ohlc.push(
            {
                x: stockDate, // the date
                y: data[i].O, // open
                high: data[i].H, // high
                low: data[i].L, // low
                close: data[i].C, // close
                volume: data[i].V,
                time: data[i].T,
                open: data[i].O,
            }
        );

        volume.push({
            x: stockDate, // the date
            y: data[i].V, // open
            high: data[i].H, // high
            low: data[i].L, // low
            close: data[i].C, // close
            volume: data[i].V,
            time: data[i].T,// open
            open: data[i].O,
        });
    }

    const options = {
        // rangeSelector: {
        //     selected: 6,
        //     allButtonsEnabled: true,
        //     buttons: [{
        //         type: 'day',
        //         count: 1,
        //         text: '1d',
        //         dataGrouping: {
        //             forced: true,
        //             units: [['day', [1]]]
        //         }
        //     },
        //     {
        //         type: 'week',
        //         count: 1,
        //         text: '1W',
        //         dataGrouping: {
        //             forced: true,
        //             units: [['week', [1]]]
        //         }
        //     },
        //     {
        //         type: 'month',
        //         count: 1,
        //         text: '1M',
        //         dataGrouping: {
        //             forced: true,
        //             units: [['month', [1]]]
        //         }
        //     },
        //     {
        //         type: 'month',
        //         count: 3,
        //         text: '3M',
        //         dataGrouping: {
        //             forced: true,
        //             units: [['month', [3]]]
        //         }
        //     },
        //     {
        //         type: 'ytd',
        //         text: 'YTD'
        //     },

        //     {
        //         type: 'all',
        //         text: 'All'
        //     }]

        // },
        rangeSelector: {
            enabled: false,
            inputEnabled: true
        },
        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '80%',
            resize: {
                enabled: true
            },
            crosshair: {
                enabled: true
            }
        }, {
            labels: {
                align: 'left'
            },
            crosshair: {
                enabled: true
            },
            top: '80%',
            height: '20%',
            offset: 0
        }],
        xAxis: {
            crosshair: {
                enabled: true
            }
        },
        plotOptions: {
            series: {}
        },
        tooltip: {

            formatter: function () {
                // The first returned item is the header, subsequent items are the
                // points
                var date = new Date(this.x);
                var utcDate = date.toUTCString();
                return ['<b>' + utcDate + '</b>'].concat(
                    this.points ?
                        this.points.map(function (point) {
                            console.log("point", point);
                            return ' ' +
                                'open: ' + point.point.open + '<br />' +
                                'high: ' + point.point.high + '<br />' +
                                'low: ' + point.point.low + '<br />' +
                                'close: ' + point.point.close + '<br />' +
                                'volume: ' + point.point.volume;

                        }) : []
                );
            },
            split: true
        },
        series: [{
            type: 'area',
            id: 'aapl-ohlc',
            name: 'AAPL Stock Price',
            data: ohlc,
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    // [0, Highcharts.getOptions().colors[0]],
                    // [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    [0, "orange"],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
        },

        {
            type: 'column',
            id: 'aapl-volume',
            name: 'AAPL Volume',
            data: volume,
            yAxis: 1,
            color: "blue"
        },

        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 800
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    }
                },

            }]
        },
    };

    const App = () => (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={options}
            />
        </div>
    );
    return <App />;

}

