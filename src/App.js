import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import { WarningAlert } from './Alert';

import { getEvents, extractLocations } from './api';
import './App.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      locations: [],
      eventCount: 10,
      errorText: '',

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


  componentDidMount() {
    this.mounted = true;
    if (!navigator.onLine) {
      this.setState({
        warningText: 'Cached data is being displayed.'
      });
    }
    else {
      this.setState({
        warningText: ''
      })
    }
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount = () => {
    this.mounted = false;
  }

  render() {
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


      </div>
    );
  }
}

export default App;
