import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import weatherCase from "./weatherCase";

class Weather extends Component {
  render() {
    const { city, weather, temp } = this.props;
    if (!weather) return null;

    const currentWeather = weatherCase[weather];

    return (
      <LinearGradient colors={currentWeather.colors} style={styles.container}>
        <View style={styles.upper}>
          <MaterialCommunityIcons
            color="white"
            size={65}
            name={currentWeather.icon}
          />
          <Text style={styles.temp}>{temp}ºC</Text>
          <Text style={styles.city}>
            <SimpleLineIcons color="white" size={18} name="location-pin" />
            {city}
          </Text>
        </View>
        <View style={styles.lower}>
          <Text style={styles.title}>{currentWeather.title}</Text>
          <Text style={styles.subtitle}>{currentWeather.subtitle}</Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  temp: {
    fontSize: 29,
    color: "#fff"
  },
  city: {
    fontSize: 20,
    color: "#fff"
  },
  lower: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  title: {
    fontSize: 24,
    fontWeight: "200",
    color: "#fff",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 80
  }
});

Weather.propTypes = {
  city: PropTypes.string,
  weather: PropTypes.string,
  temp: PropTypes.number
};

export default Weather;
