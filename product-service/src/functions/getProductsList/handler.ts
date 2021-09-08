import 'source-map-support/register';

import { formatResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import products from '@data/products.json';

const getProductsList = async () => {
  return formatResponse({ products }, 200);
}

export const main = middyfy(getProductsList);
