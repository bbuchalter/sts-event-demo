import React, { useState } from "react";
import "./App.css";

function App() {
  // Events
  interface Event {
    name: string;
    date: number;
  }
  const [eventLog, setEventLog] = useState<Event[]>([]);

  const supportedEvents = [
    "Tax prediction system records an expected tax liability for TWC",
    "Wages are paid to an employee with TX work address",
  ];

  const recordEvent = (event: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setEventLog([...eventLog, { name: event, date: Date.now() }]);
  };

  // Data
  const [qtdWagesPaid, setQtdWagesPaid] = useState<number>(0);
  const [ein, setEin] = useState<string>("");

  // Computed state
  enum validEinStates {
    BlankOK = "Blank OK",
    BlankNotOK = "Blank Not OK",
    PresentOK = "Present OK",
    PresentNotOK = "Present Not OK",
  }
  const einState: validEinStates = validEinStates.BlankOK;

  return (
    <div className="App">
      <h2>Events</h2>
      {supportedEvents.map((event) => (
        <p key={event + "button"}>
          <button onClick={recordEvent(event)}>{event}</button>
        </p>
      ))}
      <h2>Event History</h2>
      <table>
        {eventLog.length > 0 && (
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event</th>
            </tr>
          </thead>
        )}
        <tbody>
          {eventLog.map((entry) => (
            <tr key={entry.date + "logentry"}>
              <td>{entry.date}</td>
              <td>{entry.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Data</h2>
      <p>
        <label>
          QTD Wages Paid:
          <input
            type="text"
            value={qtdWagesPaid}
            onChange={(e) => setQtdWagesPaid(Number(e.target.value))}
          />
        </label>
      </p>
      <p>
        <label>
          EIN:
          <input
            type="text"
            value={ein}
            onChange={(e) => setEin(e.target.value)}
          />
        </label>
      </p>
      <h2>System state</h2>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EIN</td>
            <td>{einState}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
