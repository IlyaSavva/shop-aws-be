import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USER,
  password: PG_PASSWORD
}

export const dbConnection = async () => {
  const client = new Client(dbOptions);
  await client.connect();
  return client;
}
