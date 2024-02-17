import { h, Component } from 'preact';
import $ from 'jquery';
import { route } from 'preact-router';
import Button from '../Button/Button';
import common from '../common.less';
import style from './moon.less';
import TempBanner from '../TempBanner/TempBanner';
import 'regenerator-runtime/runtime';
import { getLunarPhase, toEmoji } from './lunarphase.js';

class Calendar extends Component {

  // displays entire week cycle for moon
  constructor(props) {
    super(props);
    this.moon = props.moon;
    var today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.moonPhases = [];
    this.fetchMoonPhases();
  }

  // API data for moon cycles including API link
  fetchMoonPhases = () => {
    const ref = this;
    const phaseNames = ['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter']
    $.getJSON(`https://craigchamberlain.github.io/moon-data/api/moon-phase-data/${this.year}/`, function (data) {
      ref.moonPhases = [];
      for (const phase of data) {
        const date = new Date(Date.parse(phase.Date))
        ref.moonPhases.push({
          time: date,
          phase: phaseNames[phase.Phase]
        })
      }
      ref.forceUpdate();
    });
  };

  prevMonth = () => {
    if (this.month === 0) {
      this.month = 11;
      this.year -= 1;
      this.fetchMoonPhases();
    } else {
      this.month -= 1;
      this.moon.forceUpdate();
    }
  };

  // get moon cycle for next month
  nextMonth = () => {
    if (this.month === 11) {
      this.month = 0;
      this.year += 1;
      this.fetchMoonPhases();
    } else {
      this.month += 1;
      this.moon.forceUpdate();
    }
  };

  getRelevantPhases = () => {
    var start = 0;
    var stop = this.moonPhases.length;
    for (let i = 0; i < stop; i++) {
      var month = this.moonPhases[i].time.getMonth();
      if (month < this.month) continue;
      if (month === this.month) start += 1;
      else if (month > this.month) {
        stop = i;
        break;
      }
    }
    return this.moonPhases.slice(stop - start, stop);
  }

  render() {
    return (
      <div>
        <div class={style.calendar}>
          <div class={style.top_calendar}>
            <button onClick={this.prevMonth}>{'<'}</button>
            <div>{this.month + 1}/{this.year}</div>
            <button onClick={this.nextMonth}>{'>'}</button>
          </div>
          <div>
            <div class={style.moon_table}>
              <div class={style.days_top}>
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>
              <div class={style.days_container}>
                {this.renderDays()}
              </div>
            </div>
          </div>
        </div>
        <div class={common.box}>
          {this.getRelevantPhases().map(phase => {
            return (
              <div>
                <p class={style.phaseStyle}>{phase.phase}: {phase.time.toDateString()}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  renderDays() {
    let days = Array(35).fill(<div class={style.day}><img /></div>); // default box for a day
    let first = new Date(this.year, this.month, 1).getDay();
    let days_in_month = new Date(this.year, this.month + 1, 0).getDate();
    for (let i = first; i < days_in_month + first; i++) { // loop for each day of the month (i-first+1 = day)
      let day = new Date(this.year, this.month, i - first + 1);
      let phase = getLunarPhase(day);
      days[i] = <div class={style.day}>{i - first + 1}<div>{toEmoji[phase]}</div></div>;
    }
    return days
  }
}

export default class Moon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class={common.container}>
        <TempBanner />
        <Calendar class={style.calendar} moon={this} />
        <Button text="Home Page" pointer={() => route('/')} />
      </div>
    );
  }
}

