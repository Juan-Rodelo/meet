import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
// import { getEvents, extractLocations } from './api';
import './App.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      locations: [],
      eventCount: 10,
      errorText: '',
      showWelcomeScreen: undefined,

    }
  }


  updateEvents = (location, eventCount) => {
    let locationEvents;
    getEvents().then((events) => {
      locationEvents = events;
      if (location === 'all' && eventCount === 0) {
        locationEvents = events;
      } else if (location !== 'all' && eventCount === 0) {
        locationEvents = events.filter((event) => event.location === location);
        console.log(eventCount);
      } else if (location === '' && eventCount > 0) {
        locationEvents = events.slice(0, eventCount);
      }
      this.setState({
        events: locationEvents,
        eventCount,
      });
    });
  };


  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }




  componentWillUnmount = () => {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        {/* pass the state to EventList as a prop of events */}
        <NumberofEvents
          eventCount={this.state.eventCount}
          updateEvents={this.updateEvents}
        />
        <WarningAlert text={this.state.warningText} />

        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />


      </div>
    );
  }
}

export default App;
