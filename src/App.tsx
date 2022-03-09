import React, { useEffect, useState } from "react";
import "./App.css";

enum EinStates {
  BlankOK = "Blank OK",
  BlankNotOK = "Blank Not OK",
  PresentOK = "Present OK",
  PresentNotOK = "Present Not OK",
}

function calculateEinState(ein: any, qtdWagesPaid: number) {
  if (ein.length === 0) {
    if (qtdWagesPaid <= 1500) {
      return EinStates.BlankOK;
    } else {
      return EinStates.BlankNotOK;
    }
  } else {
    return EinStates.PresentOK;
  }
}

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

  const recordEvent = (event: string) => {
    setEventLog([...eventLog, { name: event, date: Date.now() }]);
  };

  // Data
  const [qtdWagesPaid, setQtdWagesPaid] = useState<number>(0);
  const [ein, setEin] = useState<string>("");

  // Computed state
  const [einState, setEinState] = useState<EinStates>();
  const setEinStateAndRecordEvent = (newEinState: EinStates) => {
    if (einState !== newEinState) {
      setEinState(newEinState);
      recordEvent(`EIN state changed from ${einState} to ${newEinState}`);
    }
  };

  const lastEventWasWagesPaid = () => {
    return (
      eventLog[eventLog.length - 1]?.name ===
      "Wages are paid to an employee with TX work address"
    );
  };

  useEffect(() => {
    if (!einState || lastEventWasWagesPaid()) {
      setEinStateAndRecordEvent(calculateEinState(ein, qtdWagesPaid));
    }
    // For this demo to better reflect the way ZP works,
    // we are only recalculating the EIN state when there is an event log change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventLog]);

  return (
    <div className="App">
      <h2>Events</h2>
      {supportedEvents.map((event) => (
        <p key={event + "button"}>
          <button onClick={(e) => recordEvent(event)}>{event}</button>
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
