// src/pages/Appointments.jsx
import { useEffect, useState } from "react";

export default function Appointments() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/appointments/list/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`, // use the token from localStorage
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErr(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>My Appointments</h2>
      {loading && <p>Loading...</p>}
      {err && (
        <pre style={{ color: "crimson", whiteSpace: "pre-wrap" }}>
          {err}
        </pre>
      )}
      {!loading && items.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Age</th>
              <th>Date</th>
              <th>Doctor</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.patient_name}</td>
                <td>{a.age}</td>
                <td>{a.appointment_date}</td>
                <td>
                  {a.doctor?.name ||
                    a.doctor_name ||
                    a.doctor ||
                    a.doctor_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
