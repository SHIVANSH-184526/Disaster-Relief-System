# 📘 System Instructions: CrisisNet Dashboard

## (Disaster Relief Coordination System)

---

# ## Project Overview

Build a **Disaster Relief Management Dashboard** that helps authorities, NGOs, and volunteers manage and distribute relief materials efficiently during emergencies.

The system collects real-time demand from affected areas, prioritizes requests, and allocates resources to avoid shortages and duplication.

---

# ## Navigation Structure

### Top Navigation Tabs

* Dashboard (home/default view)
* Requests
* Supply Management
* Allocation
* Tracking
* Analytics
* Reports

---

### Header Elements

* Search bar
* Notifications
* User profile (Admin / NGO / Volunteer)
* Logout button

---

# ## Dashboard Page

---

## 🔹 Key Metrics Section (4 Cards)

**Card 1: Total Requests**

* Total number of requests received
* Change from previous day

**Card 2: Pending Requests**

* Requests not yet fulfilled

**Card 3: Delivered Requests**

* Successfully completed deliveries

**Card 4: Available Supplies**

* Total stock available

---

## 🔹 Requests Overview Chart

* Bar chart showing requests over time
* Time filter:

  * Today
  * Last 7 days
  * This month

---

## 🔹 Priority Distribution Chart

* Pie chart showing:

  * High priority 🔴
  * Medium priority 🟡
  * Low priority 🟢

---

## 🔹 Recent Requests Table

* Columns:

  * Location
  * Type (Food / Water / Medicine)
  * Quantity
  * Urgency
  * Status
  * Time

---

## 🔹 Map View

* Display all requests on map
* Color coding:

  * Red → High priority
  * Yellow → Medium
  * Green → Low

---

# ## Requests Page

---

## 🔹 Features

* View all requests
* Search by location
* Filter by:

  * Type (Food / Water / Medicine)
  * Status (Pending / Assigned / Delivered)
  * Urgency level
  * Date range

---

## 🔹 Request Table

* Request ID
* Location
* People count
* Type of need
* Urgency
* Status
* Priority score

---

## 🔹 Add Request

Form fields:

* Location (GPS/manual)
* Type of need
* Quantity
* Number of people
* Urgency level
* Notes (optional)

Buttons:

* Submit
* Cancel

---

# ## Supply Management Page

---

## 🔹 Features

* View available supplies
* Add new supplies
* Update stock
* Delete supply entry

---

## 🔹 Supply Table

* Supply ID
* NGO/Warehouse name
* Item type
* Quantity available
* Last updated

---

## 🔹 Add Supply Form

* Item type
* Quantity
* Source (NGO/Warehouse)
* Location

---

# ## Allocation Page

---

## 🔹 Features

* Match demand with supply
* Assign NGOs/volunteers
* Priority-based allocation

---

## 🔹 Allocation Table

* Request ID
* Location
* Priority
* Assigned NGO
* Status

---

## 🔹 Allocation Action

* Assign supply
* Change assignment
* Mark as dispatched

---

# ## Tracking Page

---

## 🔹 Delivery Tracking

* Track all deliveries

---

## 🔹 Status Types

* Pending
* Assigned
* In Transit
* Delivered

---

## 🔹 Tracking Table

* Request ID
* Delivery partner
* Location
* Status
* Estimated time

---

# ## Analytics Page

---

## 🔹 Demand Trends

* Line chart showing requests over time

---

## 🔹 Supply Usage

* Bar chart showing:

  * Available vs Used supply

---

## 🔹 Area-wise Analysis

* Identify high-risk zones

---

## 🔹 Priority Analysis

* Distribution of urgent vs normal requests

---

# ## Reports Page

---

## 🔹 Daily Report

* Total requests
* Total deliveries
* Pending requests

---

## 🔹 Monthly Report

* Demand vs supply analysis
* Efficiency report

---

## 🔹 Export Options

* Export to PDF
* Export to CSV

---

# ## Data Model

---

## 🔹 User

```json
{
  "id": "string",
  "name": "string",
  "role": "admin | ngo | volunteer",
  "contact": "string",
  "createdAt": "timestamp"
}
```

---

## 🔹 Request

```json
{
  "id": "string",
  "location": "string",
  "type": "food | water | medicine",
  "quantity": "number",
  "peopleCount": "number",
  "urgency": "low | medium | high",
  "status": "pending | assigned | delivered",
  "createdAt": "timestamp"
}
```

---

## 🔹 Supply

```json
{
  "id": "string",
  "source": "string",
  "type": "food | water | medicine",
  "quantity": "number",
  "location": "string"
}
```

---

## 🔹 Allocation

```json
{
  "id": "string",
  "requestId": "string",
  "supplyId": "string",
  "assignedTo": "string",
  "status": "assigned | in_transit | delivered"
}
```

---

# ## Core Functionalities

---

### Demand Management

* Submit requests
* Track requests
* Filter and search requests

---

### Supply Management

* Add supplies
* Update stock
* Monitor availability

---

### Allocation System

* Match demand with supply
* Priority-based assignment
* Avoid duplication

---

### Tracking System

* Real-time delivery tracking
* Status updates

---

### Analytics

* Demand trends
* Supply usage
* Area-based insights

---

# ## Features for MVP (Important ✅)

* Request submission form
* Admin dashboard
* Request list + filters
* Basic allocation system
* Status tracking
* Simple charts

---

# ## Features to Exclude (For Now ❌)

* AI prediction
* Real-time GPS tracking
* Offline mode
* Multi-language support
* Blockchain / advanced tech

---

# ## Technical Requirements

---

### Data Storage

* Use Firebase / Supabase / MongoDB

---

### UI

* Clean dashboard layout
* Mobile responsive

---

### Performance

* Handle multiple requests
* Fast loading UI

---

# ## Summary

Build a system that collects real-time disaster needs, prioritizes them, and ensures efficient distribution of resources using a centralized dashboard.

---

