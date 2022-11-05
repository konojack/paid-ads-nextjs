import airDB from 'services/airtableClient';

const getProduct = async (airtableId) => {
  const product = await airDB('products').find(airtableId);

  if (product) {
    return { id: product.id, ...product.fields };
  }

  return product;
};

export { getProduct };
