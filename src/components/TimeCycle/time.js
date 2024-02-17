import {h, Component } from 'preact';
import { route } from 'preact-router';

import Button from '../Button/Button'
import TempBanner from '../TempBanner/TempBanner';

import {OpenWeatherMap as OWM} from '../api'
import util from '../util'

import common from '../common.less'
import style from './timeStyle.less'

import morning from '../../assets/icons/morning.png'
import evening from '../../assets/icons/evening.png'

export default class TimeCycle extends Component {
	constructor(props){
		super(props);
	}


	// listener used for forced updating of morning/evening data
	componentDidMount() {
		this.owm_id = OWM.addListener(() => {
			this.forceUpdate();
		});
	  }
	componentWillUnmount() {
		OWM.removeListener(this.owm_id);
	}


	// the main render method for the morning/evening component
	render() {
		return (
			<div class={common.container}>
				<TempBanner />

				<div class={common.box}>
					<div class={style.detail_container}>
						<img src={morning} width='20' heigh='20'/>
						<p class={style.title}>Morning</p>
						<table class={style.detail_table}>
							<tr>
								<td>
									<p class={style.left_morning_details}>Blue Hour</p>
								</td>
								<td class={style.right_details}>
									<p>{util.formatTime(OWM.sunrise-2400)} - {util.formatTime(OWM.sunrise-1200)}</p> 
								</td>
							</tr>
							<tr>
								<td>
									<p class={style.left_morning_details}>Sunrise</p>
								</td>
								<td class={style.right_details}>
									<p>{util.formatTime(OWM.sunrise)}</p>
								</td>
							</tr>							<tr>
								<td>
									<p class={style.left_morning_details}>Golden Hour</p>
								</td>
								<td class={style.right_details}>
									<p> {util.formatTime(OWM.sunrise)}- {util.formatTime(OWM.sunrise + 3660)} </p>
								</td>
							</tr>
							<tr>
								<td>
									<p class={style.left_morning_details}>Solar Noon</p>
								</td>
								<td class={style.right_details}>
									<p>{util.formatTime(OWM.sunrise + (Math.abs(OWM.sunset-OWM.sunrise))/2)}</p>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class={common.box}>
					<div class={style.detail_container}>
						<img src={evening} width='20' heigh='20'/>
						<p class={style.title}>Evening</p>
						<table class={style.detail_table}>
							<tr>
								<td>
									<p class={style.left_evening_details}>Golden Hour</p>
								</td>
								<td class={style.right_details}>
									<p>{util.formatTime(OWM.sunset-3660)} - {util.formatTime(OWM.sunset)}</p>
								</td>
							</tr>
							
							<tr>
								<td>
									<p class={style.left_evening_details}>Sunset</p>
								</td>
								<td class={style.right_details}>
									<p>{util.formatTime(OWM.sunset)}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p class={style.left_evening_details}>Blue Hour</p>
								</td>
								<td class={style.right_details}>
									<p>{util.formatTime(OWM.sunset + 600)} - {util.formatTime(OWM.sunset + 1800)}</p>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<Button text="Home Page" pointer={()=>route('/')}/>
			</div>
		);
	}

}