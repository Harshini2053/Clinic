import { useEffect, useState } from "react";
import { format } from "date-fns";
import api, { extractErrors } from "../api/API";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    patient_name: "",
    age: "",
    appointment_date: "",
    doctor_id: "",
  });

  useEffect(() => {
    (async () => {
      setErr(""); setLoading(true);
      try {
        const res = await api.get("/doctors/");
        setDoctors(res.data || []);
      } catch (error) {
        setErr(extractErrors(error));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const today = format(new Date(), "yyyy-MM-dd");

  const book = async (e) => {
    e.preventDefault();
    setErr(""); setSuccess("");
    try {
      const res = await api.post("appointments/", {
        patient_name: form.patient_name,
        age: Number(form.age),
        appointment_date: form.appointment_date,
        doctor_id: Number(form.doctor_id),
      });
      setSuccess("✅ Appointment booked successfully!");
      setForm({ patient_name: "", age: "", appointment_date: "", doctor_id: "" });
    } catch (error) {
      setErr(extractErrors(error));
    }
  };

  return (
    <div className="page">
      <h2>Doctors</h2>
      {loading && <p>Loading doctors...</p>}
      {err && <p className="error">{err}</p>}
      <ul className="doctor-list">
        {doctors.map((d) => (
          <li key={d.id} className="doctor-card">
            <strong>{d.name}</strong> — {d.speciality} ({d.department})
          </li>
        ))}
      </ul>

      <h3>Book an Appointment</h3>
      <form onSubmit={book} className="form">
        <label>
          Patient Name
          <input
            value={form.patient_name}
            onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
            required
          />
        </label>
        <label>
          Age
          <input
            type="number"
            min="0"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
        </label>
        <label>
          Appointment Date
          <input
            type="date"
            min={today}
            value={form.appointment_date}
            onChange={(e) => setForm({ ...form, appointment_date: e.target.value })}
            required
          />
        </label>
        <label>
          Doctor
          <select
            value={form.doctor_id}
            onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.speciality}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn btn-primary">Book</button>
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}
