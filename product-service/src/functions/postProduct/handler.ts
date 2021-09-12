import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { formatResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { dbConnection } from '@libs/dbConnection';
import schema from '@functions/postProduct/schema';

const postProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema>  = async (event: APIGatewayProxyEvent) => {
  console.log('[Logger] Event: ', event);
  console.log('[Logger] Body: ', event.body);
  const { title, description, price, count } = event.body;
  if (!title || !description || !price || !count) {
    return formatResponse({ message: 'Bad Request', code: 400 }, 400);
  }
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
    return formatResponse({ message: 'Internal error', code: 500 }, 500);
  } finally {
    connection.end();
  }
  return formatResponse({ product_id: data.rows[0].product_id }, 200);
}

export const main = middyfy(postProduct);
