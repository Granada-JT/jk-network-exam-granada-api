# JK Network Exam - API (Employee Management)

Welcome to the **JK Network Employee Management API**. This is a high-performance backend built with **Node.js 24**, **Express 5**, and **Prisma 7**, utilizing a custom Driver Adapter for **MariaDB/MySQL** and a Dockerized database environment.

---

## Prerequisites

Before you begin, ensure you have the following installed:
* **Node.js** (v24.x or higher)
* **Docker & Docker Desktop** (For the local MySQL container)
* **Git**

---

### Directory Structure

```
root/
├── node_modules/
├── prisma/                 # DATABASE SCHEMA AND MIGRATIONS
│   ├── migrations/
│   └── schema.prisma
├── src/                    # BUSINESS LOGIC
│   ├── controllers/
│   ├── routes/
│   ├── lib/
│   ├── middleware/
│   └── server.js
├── .env
├── .env.example
├── docker-compose.yaml
├── package.json
└── README.md
```

## Quick Start Guide

Follow these steps exactly to get your development environment running.

### 1. Clone & Install
```bash
1. clone the project via `https` or `ssh`
2. ensure you are on the root folder of the project
3. npm install
```

### 2. Environment Configuration
The application relies on specific environment variables for database connectivity.

  1. Locate the .env.example file in the root directory.

  2. Create a new file named .env.

  3. Copy the contents of .env.example into .env and fill in your local credentials.

### Example `.env` structure:

```bash
# Database Credentials
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=jk_employee_management

# App Credentials
PORT=3001
APP_URL=http://localhost:3000
```

### 3. Launch Database (Docker)
Ensure your Docker Desktop is running, then pull and start the MySQL container:

  - Update the `docker-compose.yaml` file credentials/config with your own credentials for mysql. 

```bash
docker-compose up -d
```

### 4. Database Setup
Run the custom setup script. This command handles directory checks, client generation, and database synchronization in one go:

```bash
npm run db:setup
```
What this command does internally:

  1. Checks for/creates the `prisma/migrations` directory.

  2. Generates the Prisma Client in `src/generated` using the JS engine.

  3. Runs `migrate dev` to create your initial table structure.

  4. Executes `db push` to ensure the schema is strictly synced.

### 5. Run the Server
Start the API with via npm:
```bash
npm run dev
```
### Author: 

```bash
Jomar Granada
```

### License:
```bash
ISC
```
