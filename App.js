/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
//import { Gyroscope, Pedometer } from 'expo-sensors';
//import { Gyroscope } from 'expo';
import { Accelerometer } from "react-native-sensors";

const Value = ({name, value}) => (
    <View style={styles.valueContainer}>
      <Text style={styles.valueName}>{name}:</Text>
      <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
)

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {x: 0, y: 0, z: 0};
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.headline}>
            Accelerometer values
          </Text>
          <Value name="x" value={this.state.x} />
          <Value name="y" value={this.state.y} />
          <Value name="z" value={this.state.z} />
        </View>
    );
  }
}

/*
export default class App extends Component {
  componentDidMount() {
      Gyroscope.addListener((asd) => {
          console.log("listener");
          console.log(asd);
      })
  }

    render() {
    return (
        <View style={styles.container}>
            <Text>TESTITESTI</Text>
        </View>
    );
  }
}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headline: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueValue: {
    width: 200,
    fontSize: 20
  },
  valueName: {
    width: 50,
    fontSize: 20,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});