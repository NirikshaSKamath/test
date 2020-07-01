import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';



function dataClipper(stockdata) {
    const candle = stockdata.map(data => {
        var date = new Date(data.T);
        var stockDate = date.getTime();
        return (
            [
                stockDate, // the date
                data.O, // open
                data.H, // high
                data.L, // low
                data.C// close
            ])

    })
    return candle;

};
function VolumeClipper(stockdata) {
    const volume = stockdata.map(data => {
        var date = new Date(data.T);
        var stockDate = date.getTime();
        return (
            [
                stockDate, // the date
                data.V// the volume

            ])

    })
    return volume;

};

export default function charts(props) {

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
                align: 'right',
                x: -3
            },

            title: {
                text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            // min: 50000,
            // max: 50000000,
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],
        tooltip: {
            shape: 'square',
            headerShape: 'callout',
            borderColor: '#000000',
            shadow: false,

            positioner: function (width, height, point) {
                var chart = this.chart,
                    position;

                if (point.isHeader) {
                    position = {
                        x: Math.max(
                            // Left side limit
                            chart.plotLeft,
                            Math.min(
                                point.plotX + chart.plotLeft - width / 2,
                                // Right side limit
                                chart.chartWidth - width - chart.marginRight
                            )
                        ),
                        y: point.plotY
                    };
                } else {
                    position = {
                        x: point.series.chart.plotLeft,
                        y: point.series.yAxis.top - chart.plotTop
                    };
                }

                return position;
            }
        },
        series: [{
            type: 'area',
            id: 'aapl-ohlc',
            name: 'Open',
            data: dataClipper(props.data),
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [

                    [0, "purple"],
                    [1, Highcharts.color(Highcharts.getOptions().colors[3]).setOpacity(0).get('rgba')]
                ]
            },
        },

        {
            type: 'column',
            id: 'aapl-volume',
            name: 'Volume',
            data: VolumeClipper(props.data),
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

