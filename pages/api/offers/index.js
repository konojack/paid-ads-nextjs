import getRecentOffers from 'services/offers/getRecent';
import createOffer from 'services/offers/create';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const offers = await getRecentOffers(4);
      res.status(200).json(offers);
      break;
    }
    case 'POST': {
      try {
        const payload = req.body;
        console.log('payload', payload);
        const offer = await createOffer(payload);
        res.status(200).json({ status: 'created', offer });
      } catch (err) {
        res.status(422).json({ status: 'not_created', err });
      }

      break;
    }
    default:
      res.status(400);
  }
};
