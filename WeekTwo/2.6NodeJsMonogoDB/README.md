# ClearMed Clinic - REST API

A Node.js/Express REST API for managing a clinic's doctors and patients.

## Project Overview

ClearMed Clinic API provides endpoints to manage two core resources:

- **Doctors** - Medical professionals with specialties and availability status
- **Patients** - Clinic patients with demographic information and insurance details

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas connection string)
- npm or yarn

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Install development dependencies**:

   ```bash
   npm install nodemon -D
   ```

3. **Create a `.env` file** in the root directory with the following variables:

   ```
   PORT=3002
   MONGODB_URI=mongodb://localhost:27017/clearmed-clinic
   ```

### Running the Server

**Development mode** (with auto-reload):

```
npm run dev
```

## Data Models

### Doctor Schema

```javascript
{
  name: String (required, 2-50 characters)
  specialty: String (required, 2-100 characters)
  email: String (required, unique, valid email format)
  available: Boolean (default: true)
  timestamps: { createdAt, updatedAt }
}
```

**Example**:

```json
{
	"name": "Dr. John Smith",
	"specialty": "Cardiology",
	"email": "john.smith@clinic.com",
	"available": true
}
```

### Patient Schema

```javascript
{
  name: String (required)
  dob: Date (required, between 1900 and today)
  gender: String (required, enum: ['male', 'female', 'non-binary'])
  new_Patient: Boolean (default: false)
  insurance: Boolean (required)
  doctor_id: ObjectId (reference to Doctor, required)
  timestamps: { createdAt, updatedAt }
}
```

**Example**:

```json
{
	"name": "Jane Doe",
	"dob": "1985-05-15",
	"gender": "female",
	"new_Patient": true,
	"insurance": true,
	"doctor_id": "507f1f77bcf86cd799439011"
}
```

## API Endpoints

### Base URL

```
http://localhost:3002/ClearMed/v1
```

### Doctor Endpoints

| Method | Endpoint       | Description                 |
| ------ | -------------- | --------------------------- |
| GET    | `/doctors`     | Get all doctors             |
| POST   | `/doctors`     | Create a new doctor         |
| GET    | `/doctors/:id` | Get a specific doctor by ID |
| PUT    | `/doctors/:id` | Update a doctor             |
| DELETE | `/doctors/:id` | Delete a doctor             |

### Patient Endpoints

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| GET    | `/patients`     | Get all patients             |
| POST   | `/patients`     | Create a new patient         |
| GET    | `/patients/:id` | Get a specific patient by ID |
| PUT    | `/patients/:id` | Update a patient             |
| DELETE | `/patients/:id` | Delete a patient             |

## Testing

A Postman collection (`ClearMed Clinic.postman_collection.json`) is included in the project for testing all API endpoints.

## Error Handling

The API includes proper error handling with appropriate HTTP status codes:

- `200` - OK (successful GET, DELETE)
- `201` - Created (successful POST)
- `202` - Accepted (successful PUT)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error (unexpected errors)
