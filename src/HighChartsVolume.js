import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

export default function charts(props) {
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
                    data.C // close
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

    const options = {
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
            type: 'ohlc',
            id: 'aapl-ohlc',
            name: 'Stock Price',
            data: dataClipper(props.data),
            color: 'green',
            upColor: 'red',
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [

                    [0, "orange"],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
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

