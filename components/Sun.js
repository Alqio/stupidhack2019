var SunCalc = require('suncalc');
import React, {useState} from 'react';
import {Text, ScrollView, StyleSheet} from "react-native";


const latitude = 60.180663;
const longitude = 24.832379;

export default class SunView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            altitude: 0,
            atsimuutti: 0
        }
        ;
    }

    getState() {
        return this.state;
    }

    tick() {
        const pos = SunCalc.getPosition(new Date(), latitude, longitude);

        this.setState(prevState => ({
            altitude: pos.altitude,
            atsimuutti: pos.azimuth
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <ScrollView>
                <Text style={styles.textStyle}>
                    Altitude: {this.state.altitude}
                    {"\n"}
                    Atsimuutti: {this.state.atsimuutti}
                </Text>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 24,
        marginLeft: 12
    }
});