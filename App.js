import React, { Component } from "react";
import { Text, ScrollView } from "react-native";
import SensorView from "./SensorView";

const axis = ["x", "y", "z"];

const availableSensors = {
    accelerometer: axis,
};
/*
    gyroscope: axis,
    magnetometer: axis,

 */
const viewComponents = Object.entries(availableSensors).map(([name, values]) =>
    SensorView(name, values)
);

export default class App extends Component {
    /*
    constructor(props) {
        super(props);
        this.state = {};
    }
    */
    render() {
        return (
            <ScrollView>
                {viewComponents.map((Comp, index) => <Comp key={index} />)}

            </ScrollView>
        );
    }
}