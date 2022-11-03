import airDB from 'services/airtableClient';

const toggleActive = async (offerId) => {
  let offer = await airDB('offers')
    .select({ filterByFormula: `id="${offerId}"` })
    .firstPage();
  if (!offer) return null;

  const currentStatus = offer[0].fields.status;

  offer = await airDB('offers').update([
    {
      id: offer[0].id,
      fields: {
        status: currentStatus === 'active' ? 'inactive' : 'active'
      }
    }
  ]);

  return offer[0].fields;
};

export { toggleActive };
