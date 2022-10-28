import airDB from 'services/airtableClient';

const deleteOffer = async (airtableId) => {
  const offers = await airDB('offers').destroy(airtableId);

  return offers;
};

export { deleteOffer };
