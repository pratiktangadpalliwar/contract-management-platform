# Contract Management Platform

## Tech Stack
- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB
- Containerization: Docker

---

## Setup Instructions

### Prerequisites
- Docker
- Docker Compose

---

### Run the Application

From the project root:

```bash
docker-compose up --build

---

## Services

Frontend: http://localhost:3000  
Backend: http://localhost:5000  

---

## Architecture Overview

React Frontend ---> Express API ---> MongoDB


- Frontend consumes REST APIs.  
- Backend enforces business rules and lifecycle.  
- MongoDB stores blueprints and contracts.

---

## Data Models

### Blueprint
- name  
- fields:
  - type (text, date, signature, checkbox)  
  - label  
  - x, y  

### Contract
- name  
- blueprint (reference)  
- values (fieldId + value)  
- status (Created, Approved, Sent, Signed, Locked, Revoked)  
- createdAt  

---

## API Design Summary

| Method | Endpoint                     | Description                    |
|--------|------------------------------|--------------------------------|
| POST   | /api/blueprints              | Create blueprint               |
| GET    | /api/blueprints              | List blueprints                |
| GET    | /api/blueprints/:id          | Get blueprint                  |
| POST   | /api/contracts               | Create contract from blueprint |
| GET    | /api/contracts               | List contracts                 |
| GET    | /api/contracts/:id           | Get contract                   |
| PUT    | /api/contracts/:id/status    | Change contract status         |

---

## Contract Lifecycle

Created → Approved → Sent → Signed → Locked
Revoked (allowed after Created or Sent)

- Lifecycle enforced strictly on backend.  
- Locked contracts are immutable.  
- Revoked contracts cannot move forward.

---

## Dashboard Features

- Contract Name  
- Blueprint Name  
- Status  
- Created Date  
- Actions (View / Change State)  

### Filters
- Active  
- Pending  
- Signed  

---

## Assumptions

- No authentication.  
- Single-user system.  
- Signature stored as text value.

---

## Trade-offs

- Minimal UI design.  
- Focus on backend workflow correctness.  
- No role-based access.

---

## Docker

To rebuild and run again:

```bash
docker-compose down
docker-compose up --build