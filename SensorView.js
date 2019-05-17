import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Sensors from "react-native-sensors";
import {setUpdateIntervalForType, SensorTypes} from "react-native-sensors"

setUpdateIntervalForType(SensorTypes.accelerometer, 400);
setUpdateIntervalForType(SensorTypes.gyroscope, 400);
setUpdateIntervalForType(SensorTypes.magnetometer, 400);

const Value = ({ name, value }) => (
    <View style={styles.valueContainer}>
        <Text style={styles.valueName}>{name}:</Text>
        <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
);

export default function(sensorName, values) {
    const sensor$ = Sensors[sensorName];

    return class SensorView extends Component {
        constructor(props) {
            super(props);

            const initialValue = values.reduce(
                (carry, val) => ({ ...carry, [val]: 0 }),
                {}
            );
            this.state = initialValue;
        }

        componentWillMount() {

            const subscription = sensor$.subscribe(values => {
                this.setState({ ...values });
            });
            this.setState({ subscription });
        }

        componentWillUnmount() {
            this.state.subscription.unsubscribe();
            this.setState({ subscription: null });
        }
        calculateRoll(Y, Z) {
            return Math.atan2(Y, Z) * 180/Math.PI;

        }
        calculatePitch(X, Y, Z) {
            return Math.atan2(-X, Math.sqrt(Y*Y + Z*Z)) * 180/Math.PI;
        }

        calculateYaw(X, Y, Z) {
            return 180 * Math.atan(Z/Math.sqrt(X*X + Z*Z))/Math.PI;
        }

        render() {
            //console.log(this.state);
            const {x, y, z} = this.state;
            return (
                        /*
                    */
                <View>
                    <Text>
                        Pitch: {this.calculateRoll(y, z)}
                        Roll: {this.calculatePitch(x,y,z)}
                        Yaw: {this.calculateYaw(x,y,z)}
                    </Text>
                </View>

                /*
                <View style={styles.container}>
                    <Text style={styles.headline}>{sensorName} values</Text>
                    {values.map(valueName => (
                        <Value
                            key={sensorName + valueName}
                            name={valueName}
                            value={this.state[valueName]}
                        />
                    ))}
                </View>

                 */
            );
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        marginTop: 50
    },
    headline: {
        fontSize: 30,
        textAlign: "left",
        margin: 10
    },
    valueContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    valueValue: {
        width: 200,
        fontSize: 20
    },
    valueName: {
        width: 50,
        fontSize: 20,
        fontWeight: "bold"
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    }
});