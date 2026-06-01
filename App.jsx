
import { useEffect, useState } from "react";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("patients");
    if (data) setPatients(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const addPatient = () => {
    if (!name || !phone) return;
    const newPatient = { id: Date.now(), name, phone };
    setPatients(prev => [newPatient, ...prev]);
    setName("");
    setPhone("");
  };

  const deletePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
    <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "Arial" }}>
      <h2>Clinic System</h2>

      <div style={{ padding: 10, border: "1px solid #ccc", marginBottom: 10 }}>
        <input
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", marginBottom: 8, width: "100%" }}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ display: "block", marginBottom: 8, width: "100%" }}
        />
        <button onClick={addPatient}>Add Patient</button>
      </div>

      {patients.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div><b>{p.name}</b></div>
            <div>{p.phone}</div>
          </div>
          <button onClick={() => deletePatient(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
