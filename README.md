# DHBW-Mannheim-WI2024SEA-SOA

**Services & Ports**
- Product Service (Python, Port 3001)
  - GET /products
  - GET /products/:id
- User Service (Go, Port 3002)
  - GET /users
  - GET /users/:id
- Order Service (Node.js, Port 3003)
  - GET /orders
  - GET /orders/:id

**ESB (Enterprise Service Bus, Node.js, Port 3000)**
- GET /esb?orderId=1 → Aggregiert Daten aus allen Services
- GET /esb?userId=1 → Liefert User + zugehörige Orders
- GET /esb?productId=1 → Liefert Product + zugehörige Orders

**Architektur-Erklärung:**
- **SOA**: Zentrale Orchestrierung über den ESB, Services sind lose gekoppelt.
- **ESB**: Verantwortlich für die Aggregation und Transformation von Daten zwischen Services.
- Vorteil: Hohe Wiederverwendbarkeit der Services, zentrale Steuerung, Flexibilität bei Änderungen.
