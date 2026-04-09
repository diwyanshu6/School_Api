# School API

A simple and lightweight Node.js/Express API that manages school data. It lets you add new schools and fetch a list of schools sorted by how close they are to a specific location (using the Haversine formula).

## Links
- **Live URL**: https://school-api-izu8.onrender.com (Hosted on Render's free tier, so the first hit might take a few seconds to spin up)
- **Postman Collection**: https://documenter.getpostman.com/view/49141982/2sBXirjoP5

## Tech Stack
- Node.js & Express
- MySQL (using `mysql2` package)
- Joi for request validation

## Endpoints

### 1. Add a School
`POST /addSchool`

Payload:
```json
{
  "name": "ABC School",
  "address": "Ahmedabad",
  "latitude": 23.0225,
  "longitude": 72.5714
}
```

### 2. Get Nearby Schools
`GET /listSchools?latitude=23.02&longitude=72.57`

Sorts all schools in the database by distance from the provided coordinates and returns them.

## Running it locally

1. Clone the repo
```bash
git clone https://github.com/diwyanshu6/School_Api.git
cd School_Api
```

2. Install dependencies
```bash
npm install
```

3. Setup your environment variables. Create a `.env` file in the root:
```
DB_URL=your_mysql_connection_string
PORT=3000
```

4. For the database, just create a table like this:
```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address TEXT,
    latitude FLOAT,
    longitude FLOAT
);
```

5. Start the server
```bash
npm run dev
```

## How it works internally
The system calculates the geographical distance from the user's provided coordinates to every school in the DB using the Haversine formula. It then sorts the results so the closest schools show up first.

---
Built by Diwyanshu.
