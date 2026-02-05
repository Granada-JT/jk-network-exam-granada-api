import { defineConfig } from '@prisma/config';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const connectionString = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default defineConfig({
	datasource: {
		url: connectionString
	},
	migrations: {
    path: "prisma/migrations",
  },
});