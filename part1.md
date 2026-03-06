# Activity — Part 1 (Without Authentication)

## Introduction

- In this activity, we will build a full-stack application **without authentication**. Additionally, we will write **API Tests**.

- Approach this task **iteratively** for structured development:  
  - **Iteration 1:** Adding and Fetching events (POST & GET all)  
  - **Iteration 2:** Reading and Deleting a Single event (GET by ID & DELETE)  
  - **Iteration 3:** Updating an event (PUT)
  - **Iteration 4:** Writing **API Tests**

> Later, during Part 2, we will add **user administration** and **protect** the routes. 

---

## Setup

- Clone [the starter repository](https://github.com/tx00-resources-en/w8-extra-activity) into a separate folder.

---

## Deliverables

1. **Code** for **API V1** (*without* authentication)  
2. **Code** for **Frontend V1** (*without* authentication) 
3. Backend **tests** for API V1  

---

## Data Model

Here's the Event schema:  

```javascript
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
```

---

## Activity Checklist

### Iterations
- [ ] **Iteration 1:** Added and fetched events  
- [ ] **Iteration 2:** Read and deleted a single event  
- [ ] **Iteration 3:** Updated an event  
- [ ] **Iteration 4:** Wrote API tests  


### Commit Format
- [ ] Used the correct commit format, e.g.:  
  - `[iter1] feat(events): implement POST /api/events to create a new event`
  - `[iter1] feat(events): implement GET /api/events to fetch all events`
  - `[iter2] feat(events): implement GET /api/events/:id to fetch a single event`
  - `[iter2] feat(events): implement DELETE /api/events/:id to delete an event`
  - `[iter3] feat(events): implement PUT /api/events/:id to update an event`
  - `[iter4] test(events): add API tests for events CRUD`

### Collaboration
- [ ] Worked on **one branch only**  
- [ ] Alternated **driver/navigator roles** after each iteration  

### Deliverables
- [ ] Code for **API V1** (*without authentication*)  
- [ ] Code for **Frontend V1** (*without authentication*)  
- [ ] Backend **tests** for API V1  


