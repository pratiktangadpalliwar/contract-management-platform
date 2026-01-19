import { useEffect, useState } from "react";
import {
  getBlueprints,
  createBlueprint,
  createContract,
  getContracts,
  changeStatus
} from "./api";

export default function App() {
  const [blueprints, setBlueprints] = useState([]);
  const [contracts, setContracts] = useState([]);

  const [bpName, setBpName] = useState("");
  const [fields, setFields] = useState([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");

  const [selectedBp, setSelectedBp] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = () => {
    getBlueprints().then(setBlueprints);
    getContracts().then(setContracts);
  };

  const addField = () => {
    setFields([...fields, { label, type, x: fields.length * 10, y: 0 }]);
    setLabel("");
  };

  const saveBlueprint = async () => {
    await createBlueprint({ name: bpName, fields });
    setBpName("");
    setFields([]);
    loadAll();
  };

  const saveContract = async () => {
    await createContract({
      name: "Contract-" + Date.now(),
      blueprint: selectedBp,
      values: []
    });
    setSelectedBp("");
    loadAll();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Blueprint</h2>
      <input placeholder="Blueprint Name" value={bpName} onChange={e => setBpName(e.target.value)} />
      <br /><br />
      <input placeholder="Field Label" value={label} onChange={e => setLabel(e.target.value)} />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="date">Date</option>
        <option value="signature">Signature</option>
        <option value="checkbox">Checkbox</option>
      </select>
      <button onClick={addField}>Add Field</button>
      <br /><br />
      <button onClick={saveBlueprint}>Save Blueprint</button>

      <hr />

      <h2>Create Contract</h2>
      <select value={selectedBp} onChange={e => setSelectedBp(e.target.value)}>
        <option value="">Select Blueprint</option>
        {blueprints.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
      </select>
      <button onClick={saveContract}>Create Contract</button>

      <hr />

      <h2>Contracts Dashboard</h2>
      {contracts.map(c => (
        <div key={c._id}>
          {c.name} | {c.blueprint?.name} | {c.status}
          <button onClick={() => changeStatus(c._id, "Approved")}>Approve</button>
          <button onClick={() => changeStatus(c._id, "Sent")}>Send</button>
          <button onClick={() => changeStatus(c._id, "Signed")}>Sign</button>
          <button onClick={() => changeStatus(c._id, "Locked")}>Lock</button>
          <button onClick={() => changeStatus(c._id, "Revoked")}>Revoke</button>
        </div>
      ))}
    </div>
  );
}
