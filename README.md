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

