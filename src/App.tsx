import React, { useState } from "react";
import "./App.css";

function App() {
  const [eventLog, setEventLog] = useState<string[]>([]);

  const taxPredictionEvent =
    "Tax prediction system records an expected tax liability for TWC";

  const recordEvent = (event: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setEventLog([...eventLog, event]);
  };

  const eventLogEntries = eventLog.map((event) => <li>{event}</li>);

  return (
    <div className="App">
      <button onClick={recordEvent(taxPredictionEvent)}>
        {taxPredictionEvent}
      </button>
      <ul>{eventLogEntries}</ul>
    </div>
  );
}

export default App;
