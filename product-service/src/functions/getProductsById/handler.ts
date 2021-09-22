import 'source-map-support/register';

import type { APIGatewayProxyEvent } from 'aws-lambda';
import { formatResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { dbConnection } from '@libs/dbConnection';

const getProductsById = async (event: APIGatewayProxyEvent) => {
  console.log('[Logger] Event: ', event);
  console.log('[Logger] Path parameters: ', event.pathParameters );
  const id = event?.pathParameters?.id;

  if (!id) return formatResponse({ message: 'Bad request' }, 400);

  const connection = await dbConnection();
  let data;

  try {
    data = await connection.query(`
      SELECT products.id, title, description, price, count
      FROM products
      JOIN stocks
      ON products.id = stocks.product_id
      WHERE products.id = '${id}';
    `);
  } catch(err) {
    console.error('Error on db query', err);
    return formatResponse({ message: 'Internal error', code: 500 }, 500);
  } finally {
    connection.end();
  }
  
  if (!data) return formatResponse({ message: 'Product not found' }, 404);

  return formatResponse({ data: data.rows[0] }, 200);
}

export const main = middyfy(getProductsById);
