import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

export default function charts() {
    const data = [
        [1317888000000, 372.5101, 375, 372.2, 372.52],
        [1317888060000, 372.4, 373, 372.01, 372.16],
        [1317888120000, 372.16, 372.4, 371.39, 371.62],
        [1317888180000, 371.62, 372.16, 371.55, 371.75],
        [1317888240000, 371.75, 372.4, 371.57, 372],
        [1317888300000, 372, 372.3, 371.8, 372.24],
        [1317888360000, 372.22, 372.45, 372.22, 372.3],
        [1317888420000, 372.3, 373.25, 372.3, 373.15],
        [1317888480000, 373.01, 373.5, 373, 373.24],
        [1317888540000, 373.36, 373.88, 373.19, 373.88],
        [1317888600000, 373.8, 374.34, 373.75, 374.29],
        [1317888660000, 374.29, 374.43, 374, 374.01],
        [1317888720000, 374.05, 374.35, 373.76, 374.35],
        [1317888780000, 374.41, 375.24, 374.37, 374.9],
        [1317888840000, 374.83, 375.73, 374.81, 374.96],
        [1317888900000, 374.81, 375.4, 374.81, 375.25],
        [1317888960000, 375.2, 375.7, 375.14, 375.19],
        [1317889020000, 375.43, 375.43, 374.75, 374.76],
        [1317889080000, 374.94, 375.5, 374.81, 375.13],
        [1317889140000, 375.12, 375.48, 375, 375.04],
        [1317889200000, 375.24, 375.24, 375, 375.08],
        [1317889260000, 375.16, 375.16, 374.51, 374.51],
        [1317889320000, 374.51, 374.75, 374.2, 374.27],
        [1317889380000, 374.22, 374.55, 373.83, 374.55],
        [1317889440000, 374.69, 374.86, 374.01, 374.2],
        [1317889500000, 374.32, 374.65, 374.31, 374.51],]

    const options = {

        title: {
            text: 'AAPL stock price by minute'
        },

        subtitle: {
            text: 'Using explicit breaks for nights and weekends'
        },

        xAxis: {
            breaks: [{ // Nights
                from: Date.UTC(2011, 9, 6, 16),
                to: Date.UTC(2011, 9, 7, 8),
                repeat: 24 * 36e5
            }, { // Weekends
                from: Date.UTC(2011, 9, 7, 16),
                to: Date.UTC(2011, 9, 10, 8),
                repeat: 7 * 24 * 36e5
            }]
        },

        rangeSelector: {
            buttons: [{
                type: 'hour',
                count: 1,
                text: '1h'
            }, {
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 1,
            inputEnabled: false
        },

        series: [{
            name: 'AAPL',
            type: 'area',
            data: data,
            gapSize: 5,
            tooltip: {
                valueDecimals: 2
            },
            color: "green",
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
                    [0, "red"],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            threshold: null
        }]
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

