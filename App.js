import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar
} from "react-native";
import Weather from "./Weather";
import { fetchWeather } from "./api";

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    weather: null,
    temp: null,
    city: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude)
          .then(res => {
            this.setState({
              isLoaded: true,
              weather: res.data.weather[0].main,
              temp: res.data.main.temp,
              city: res.data.name
            });
          })
          .catch(err => {
            this.setState({ err: err.response.data });
          });
      },
      () => {
        this.setState({ error: "Could't find location" });
      }
    );
  }

  render() {
    const { isLoaded, error, weather, temp, city } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {isLoaded ? (
          <Weather
            weather={weather}
            temp={parseFloat((temp - 273.15).toFixed(1))}
            city={city}
          />
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator />
            <Text style={styles.loadingText}>Loading the weather data...</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loading: {
    flex: 1,
    backgroundColor: "#FDF6AA",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  loadingText: {
    fontSize: 20,
    marginBottom: 40
  },
  errorText: {
    backgroundColor: "transparent",
    color: "red",
    marginBottom: 50,
    fontSize: 18
  }
});
