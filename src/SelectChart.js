import React from 'react';
import HighChartsVolume from "./HighChartsVolume";
import AreaChartVolume from "./AreaHighVolume";
import CandleStickHigh from "./CandleStickHigh";
import { makeStyles } from '@material-ui/core/styles';
import { chartday } from "./data/chartday";
import { ChartData } from "./data/chartData3";
import { monthlyData } from './data/MonthlyData';
import { sixMonths } from "./data/chart6months";
import { weeklyData } from './data/weeklyData';
import { tenYears } from "./data/TemYears";
import { yearly } from "./data/year";
import { twoYears } from "./data/TwoYears";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';




class SelectChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartType: "Line",
            currentData: sixMonths,
            range: "6M"
        }
    }

    handleChange(field, value) {

        this.setState({ [field]: value.target.value, range: "6M", currentData: sixMonths, });
    }
    useStyles() {
        return makeStyles((theme) => ({
            formControl: {
                margin: theme.spacing(1),
                minWidth: 200,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
        }));
    }


    render() {
        const classes = this.useStyles();
        const { chartType, currentData, range } = this.state;
        return (
            <div className="selectChart">

                <div className="margin-top-20">
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            id="demo-simple-select-label">Chart Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={chartType}
                            placeholder="select"
                            onChange={this.handleChange.bind(this, "chartType")}
                        >
                            <MenuItem value="Line">Line</MenuItem>
                            <MenuItem value="CandleStickBox">CandleStick</MenuItem>
                            <MenuItem value="CandleStick">OHLC</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="margin-top-40">
                    <div>
                        <ul className="renageSelectors">
                            <li className={range === "1D" ? "selected" : ""}
                                onClick={() => { this.setState({ currentData: chartday, range: "1D" }) }} >
                                1D</li>
                            <li className={range === "1W" ? "selected" : ""}
                                onClick={() => { this.setState({ currentData: weeklyData, range: "1W" }) }}>
                                1W</li>
                            <li className={range === "1M" ? "selected" : ""}
                                onClick={() => { this.setState({ currentData: monthlyData, range: "1M" }) }}>1M</li>
                            <li className={range === "3M" ? "selected" : ""}
                                onClick={() => { this.setState({ currentData: ChartData, range: "3M" }) }}>3M</li>
                            <li className={range === "6M" ? "selected" : ""}
                                onClick={() => { this.setState({ currentData: sixMonths, range: "6M" }) }}>6M</li>
                            <li className={range === "1Y" ? "selected" : ""}
                                onClick={() => { this.setState({ currentData: yearly, range: "1Y" }) }}>1Y</li>
                            <li className={range === "2Y" ? "selected" : ""}
                                onClick={() => { this.setState({ currentData: twoYears, range: "2Y" }) }}>2Y</li>
                            <li className={range === "10Y" ? "selected" : ""}
                                onClick={() => { this.setState({ currentData: tenYears, range: "10Y" }) }}>10Y</li>
                        </ul>
                    </div>
                    {
                        chartType === "Line" ?
                            <AreaChartVolume data={currentData} /> :
                            chartType === "CandleStickBox" ?
                                <CandleStickHigh data={currentData} /> :
                                chartType === "CandleStick" ?
                                    <HighChartsVolume data={currentData} /> : null
                    }

                </div>
            </div>
        )
    }

}



export default SelectChart;
