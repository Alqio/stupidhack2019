import React, { Component } from "react";
import { ScrollView, Text, Button } from "react-native";
import Torch from "react-native-torch";
import SensorView from "./SensorView";

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

    handleTorch = (value) => {
        const { isTorchOn } = this.state;

        if (!isTorchOn && value > 3) {
            Torch.switchState(true);
            this.setState({ isTorchOn: true });
        } else if (isTorchOn && value <= 3) {
            Torch.switchState(false);
            this.setState({ isTorchOn: false });
        }
    }

    render() {
        return (
            <ScrollView onValueChange={ () => this.handleTorch(value)}>
                {viewComponents.map((Comp, index) => <Comp key={index} />)}
                <Button
                    onPress={this._handleTorch}
                    title={this.state.isTorchOn ? "Turn off the Torch" : "Turn on the Torch"}
                />
            </ScrollView>
        );
    }
}