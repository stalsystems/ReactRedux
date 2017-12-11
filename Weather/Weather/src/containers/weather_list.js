import React, { Component } from 'react'
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(cityData) {
        const name = cityData.city.name;
        const id = cityData.city.id;
        //cityData.list.map itera en esa lista
        const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => (temp-273.15));
        //const temps = cityData.list.map(weather => weather.main.temp);
        //sparklines library https://github.com/borisyankov/react-sparklines
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        //const lon = cityData.city.coord.lon;
        //const lat = cityData.city.coord.lat;

        const {lon, lat} = cityData.city.coord;

        return (
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <td><Chart data={temps} color="yellow" units="°C" /></td>
                <td><Chart data={pressures} color="green" units="hPa" /></td>
                <td><Chart data={humidities} color="black" units="%" /></td>
            </tr>
        )
    }
    render () {
        return (
          <table className="table table-hover">
              <thead>
                  <tr>
                    <th>City</th>
                    <th>Temperature (°C)</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                  </tr>
              </thead>
              <tbody>
                  {this.props.weather.map(this.renderWeather)}
              </tbody>
          </table>  
        );
    }
}

function mapStateToProps({ weather }) {
    return { weather }; // {weather} === { weather: weather }
}

export default connect(mapStateToProps)(WeatherList);