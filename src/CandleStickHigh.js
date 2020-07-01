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


export default function charts(props) {
    // var data = stockData;

    // // split the data set into ohlc and volume
    // var ohlc = [],
    //     volume = [],
    //     dataLength = data.length,
    //     // set the allowed units for data grouping
    //     groupingUnits = [

    //         [
    //             'week',
    //             [1]
    //         ], [
    //             'month',
    //             [1, 3, 6]
    //         ], [
    //             'year',
    //             null
    //         ]],

    //     i = 0;

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
        //         text: "All"
        //     }]

        // },
        rangeSelector: {
            enabled: false,
            inputEnabled: true
        },

        // title: {
        //     text: 'Historical'
        // },

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
            split: true,
            valueDecimals: 2,
            borderColor: '#000000',
        },

        series: [{
            type: 'candlestick',
            name: 'Stock Price',
            data: dataClipper(props.data),
            color: "green",
            upColor: 'red',

        }, {
            type: 'column',
            name: 'Volume',
            data: VolumeClipper(props.data),
            yAxis: 1,

        },

        ]
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

