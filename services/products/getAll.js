import airDB from 'services/airtableClient';

const getAllProducts = async () => {
  const products = await airDB('products').select().firstPage();

  if (products) {
    return products.map((product) => ({ airtableId: product.id, ...product.fields }));
  }
};

export { getAllProducts };
