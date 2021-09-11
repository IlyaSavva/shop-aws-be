import 'source-map-support/register';

import { formatResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { dbConnection } from '@libs/dbConnection';

const postProduct = async () => {
  const connection = await dbConnection();
  let data;

  try {
    console.log('post')
  } catch(err) {
    console.error('Error on db query', err);
  } finally {
    connection.end();
  }
  return formatResponse({ data }, 200);
}

export const main = middyfy(postProduct);
