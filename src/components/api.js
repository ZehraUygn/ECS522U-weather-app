import $ from 'jquery';

export const OpenWeatherMap = {

	city: 'London',
	units: 'metric',
	rain: 'Unknown',
	forecast: [], // stores a list of {time, temp, main, prob}
	listeners: [],

	init() {
		this.fetchWeatherData();
		setInterval(() => this.fetchWeatherData(), 1* 60 * 1000);
	},

	addListener(f) {
		var id = this.listeners.length;
		this.listeners.push(f);
		return id;
	},

	removeListener(id) {
		this.listeners.pop(id)
	},

	refreshListeners() {
		for (const listener of this.listeners) {
            listener();
        };
	},

	getDegreeUnit() {
		return this.units === 'metric' ? 'C' : 'F';
	},

    // a call to fetch weather data via wunderground
	fetchWeatherData() {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// current weather
		var url = "https://api.openweathermap.org/data/2.5/weather?q="+ this.city +"&units="+this.units+"&appid=42b2b12795d0e8746b90586151f0e9be";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : (parsed) => this.parseResponse(parsed),
			error : function(req, err){console.log('API call failed: ' + err);}
		})

		// forcast request
		// maybe use geolocation?
		this.forecast = [];
		url = "http://api.openweathermap.org/data/2.5/forecast?lat=51.50&lon=0.00&units="+this.units+"&appid=42b2b12795d0e8746b90586151f0e9be";
		
		// load from file for testing
		/*var json = require("./forecast.json");
		var forecast_len = Math.min(6, json['list'].length) // We only need at most 6 elements
		for (let i = 0; i < forecast_len; i++)
		{
			this.forecast.push({
				time: json['list'][i]['dt'],
				temp: json['list'][i]['main']['temp'],
				main: json['list'][i]['weather'][0]['main'],
				prob: json['list'][i]['pop']
			});
		}
		*/
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : (parsed) => this.parseForecast(parsed),
			error : function(req, err){console.log('API call failed: ' + err);}
		})
	},

	// store API data in local variables to be used across the many pages

    parseResponse(parsed_json) {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var clarity = parsed_json['weather'][0]['main'];
		var rain = parsed_json['rain']&& parsed_json['rain']['1h'];
		var description = parsed_json['weather']['description'];
		var sunrise_time = parsed_json['sys']['sunrise']
		var sunset_time = parsed_json['sys']['sunset'];
		var visibility = parsed_json['visibility'];
		var humidity = parsed_json['main']['humidity'];
		var pressure = parsed_json['main']['pressure'];

		// set states for fields so they could be rendered later on
		this.locate = location;
		this.temp = temp_c;
		this.cond = conditions;
		this.clarity = clarity;
		if (rain) {
			this.rain = rain;
		} 
		this.desc = description;
		this.sunrise = sunrise_time;
		this.sunset = sunset_time;
		this.visibility = visibility;
		this.humidity = humidity;
		this.pressure = pressure;

		this.refreshListeners();
	},

	parseForecast(json){
		var forecast_len = Math.min(6, json['list'].length) // We only need at most 6 elements
		for (let i = 0; i < forecast_len; i++)
		{
			this.forecast.push({
				time: json['list'][i]['dt'],
				temp: json['list'][i]['main']['temp'],
				main: json['list'][i]['weather'][0]['main'],
				prob: json['list'][i]['pop']
			});
		}

		this.refreshListeners();
	}
}