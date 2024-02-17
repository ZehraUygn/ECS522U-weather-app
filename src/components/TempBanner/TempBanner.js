import {h, Component } from 'preact';

import {OpenWeatherMap as OWM} from '../api'

import style from './TempBannerStyle'
import common from '../common'

// contains all common data being used from all pages
// prevents the need to repeat code
// contains the data for the weather and details about the weather/rain type
// this is for top part of all pages 

export default class TempBanner extends Component {
    constructor(props){
		super(props);
	}

    componentDidMount() {
		this.owm_id = OWM.addListener(() => {
			this.forceUpdate();
		});
	  }
	componentWillUnmount() {
		OWM.removeListener(this.owm_id);
	}


	//main render for common data, including the degree unit

    render() {
        return (
			<div>
				<p class={common.city_text}>{OWM.city}</p>

				<div class={style.banner}>
					<p class={style.temperature}>
						{Math.round(OWM.temp)}
						<p class={style.temp_unit}>°{OWM.getDegreeUnit()}</p>
					</p>
					
					<p class={style.clarity}> | {OWM.clarity}</p>
				</div>
				
			</div>
		);
    }
}