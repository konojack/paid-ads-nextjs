import getRecentOffers from 'services/offers/getRecent';

export default async (req, res) => {
  const offers = await getRecentOffers(4);
  res.status(200).json(offers);
};
