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

  const eventButtons = supportedEvents.map((event) => (
    <button onClick={recordEvent(event)}>{event}</button>
  ));

  // Data
  const [qtdWagesPaid, setQtdWagesPaid] = useState<number>(0);
  const [ein, setEin] = useState<string>("");
  const dataInputs = [
    <label>
      QTD Wages Paid:
      <input
        type="text"
        value={qtdWagesPaid}
        onChange={(e) => setQtdWagesPaid(Number(e.target.value))}
      />
    </label>,
    <label>
      EIN:
      <input type="text" value={ein} onChange={(e) => setEin(e.target.value)} />
    </label>,
  ];

  return (
    <div className="App">
      <h2>Events</h2>
      {eventButtons.map((button) => (
        <p>{button}</p>
      ))}
      <h2>Event History</h2>
      <table>
        {eventLog.length > 0 && (
          <thead>
            <th>Seconds Since Unix Epoc</th>
            <th>Event</th>
          </thead>
        )}
        <tbody>
          {eventLog.map((entry) => (
            <tr>
              <td>{entry.date}</td>
              <td>{entry.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Data</h2>
      {dataInputs.map((input) => (
        <p>{input}</p>
      ))}
    </div>
  );
}

export default App;
