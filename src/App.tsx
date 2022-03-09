import React, { useState } from "react";
import "./App.css";

function App() {
  const [eventLog, setEventLog] = useState<string[]>([]);

  const supportedEvents = [
    "Tax prediction system records an expected tax liability for TWC",
    "Wages are paid to an employee with TX work address",
  ];

  const recordEvent = (event: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setEventLog([...eventLog, event]);
  };

  const eventButtons = supportedEvents.map((event) => (
    <button onClick={recordEvent(event)}>{event}</button>
  ));

  const eventLogEntries = eventLog.map((event) => <li>{event}</li>);

  return (
    <div className="App">
      {eventButtons}
      <ul>{eventLogEntries}</ul>
    </div>
  );
}

export default App;
