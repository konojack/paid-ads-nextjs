import airDB from 'services/airtableClient';

const getRecentOffers = async (maxRecords) => {
  const offers = await airDB('offers')
    .select({
      sort: [{ field: 'id', direction: 'desc' }],
      filterByFormula: 'status="active"',
      maxRecords
    })
    .firstPage();

  return offers.map((offer) => offer.fields);
};

export default getRecentOffers;
