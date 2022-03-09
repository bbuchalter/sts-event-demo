import React from "react";
import "./App.css";

interface AppProps {}
interface AppState {
  eventLog: string[];
}

class App extends React.Component<{}, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      eventLog: [],
    };
  }

  taxPredictionEvent =
    "Tax prediction system records an expected tax liability for TWC";

  recordEvent = (event: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState((prevState) => ({
      eventLog: [...prevState.eventLog, event],
    }));
  };

  render() {
    const eventLogEntries = this.state.eventLog.map((entry) => {
      return <li>{entry}</li>;
    });

    return (
      <div className="App">
        <button onClick={this.recordEvent(this.taxPredictionEvent)}>
          {this.taxPredictionEvent}
        </button>
        <ul>{eventLogEntries}</ul>
      </div>
    );
  }
}

export default App;
