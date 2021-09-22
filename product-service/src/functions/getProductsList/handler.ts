import 'source-map-support/register';

import type { APIGatewayProxyEvent } from 'aws-lambda';
import { formatResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { dbConnection } from '@libs/dbConnection';

const getProductsList = async (event: APIGatewayProxyEvent) => {
  console.log('[Logger] Event: ', event);

  const connection = await dbConnection();
  let data;

  try {
    data = await connection.query(`
      SELECT products.id, title, description, price, count
      FROM products
      JOIN stocks
      ON products.id = stocks.product_id;
    `);
  } catch(err) {
    console.error('Error on db query', err);
    return formatResponse({ message: 'Internal error', code: 500 }, 500);
  } finally {
    connection.end();
  }
  return formatResponse({ data: data.rows }, 200);
}

export const main = middyfy(getProductsList);
