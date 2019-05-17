import React, { Component } from "react";
import { ScrollView, Text, Button } from "react-native";
import SensorView from "./SensorView";
import Torch from "react-native-torch";

const axis = ["x", "y", "z"];

const availableSensors = {
    accelerometer: axis,
    gyroscope: axis
};
const viewComponents = Object.entries(availableSensors).map(([name, values]) =>
    SensorView(name, values)
);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTorchOn: false,
        };
    }

    _handleTorch = () => {
        const { isTorchOn } = this.state;
        Torch.switchState(!isTorchOn);
        this.setState({ isTorchOn: !isTorchOn });
    }

    render() {
        return (
            <ScrollView>
                {viewComponents.map((Comp, index) => <Comp key={index} />)}
                <Button
                    onPress={this._handleTorch}
                    title={this.state.isTorchOn ? "Turn off the Torch" : "Turn on the Torch"}
                />
            </ScrollView>
        );
    }
}