const BASE = "http://localhost:5000/api";

export const getBlueprints = () => fetch(`${BASE}/blueprints`).then(r => r.json());
export const createBlueprint = data => fetch(`${BASE}/blueprints`, {method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(r=>r.json());
export const createContract = data => fetch(`${BASE}/contracts`, {method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(r=>r.json());
export const getContracts = () => fetch(`${BASE}/contracts`).then(r=>r.json());
export const changeStatus = (id, s) => fetch(`${BASE}/contracts/${id}/status`, {method:"PUT",headers:{'Content-Type':'application/json'},body:JSON.stringify({newStatus:s})}).then(r=>r.json());
