import 'source-map-support/register';

import type { APIGatewayProxyEvent } from 'aws-lambda';
import { formatResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { dbConnection } from '@libs/dbConnection';

const postProduct = async (event: APIGatewayProxyEvent) => {
  console.log(event.body);
  const { title, description, price, count } = event.body;
  const connection = await dbConnection();
  let data;

  try {
    data = await connection.query(`
      WITH ins AS (
        INSERT INTO products (title, description, price)
        VALUES ('${title}', '${description}', '${price}')
        RETURNING id
        )
      INSERT INTO stocks (product_id, count)
      SELECT id, '${count}' FROM ins
      RETURNING product_id;
    `);
  } catch(err) {
    console.error('Error on db query', err);
  } finally {
    connection.end();
  }
  return formatResponse({ product_id: data.rows[0].product_id }, 200);
}

export const main = middyfy(postProduct);
