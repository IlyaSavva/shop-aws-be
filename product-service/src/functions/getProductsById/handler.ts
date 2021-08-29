import 'source-map-support/register';

import type { APIGatewayProxyEvent } from 'aws-lambda';
import { formatResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import products from '@data/products.json';

const getProductsById = async (event: APIGatewayProxyEvent) => {
  const { id } = event.pathParameters;

  const product = products.find((item) => item.id === +id);

  if (!product) return formatResponse({ message: 'Product not found' }, 404);

  return formatResponse({ product }, 200);
}

export const main = middyfy(getProductsById);
