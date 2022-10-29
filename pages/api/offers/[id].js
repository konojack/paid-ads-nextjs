import { unstable_getServerSession } from 'next-auth';
import { deleteOffer } from 'services/offers/delete';
import { getOfferById } from 'services/offers/get';
import { isOfferAuthorized } from 'services/offers/isAuthorized';
import { updateOffer } from 'services/offers/update';
import { authOptions } from '../auth/[...nextauth]';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  let offer = await getOfferById(req.query.id);

  if (!isOfferAuthorized(offer, session)) {
    res.status(401).json({ status: 'not_authorized' });
  }
  switch (req.method) {
    case 'DELETE': {
      try {
        offer = await deleteOffer(offer.airtableId);
        res.status(200).json({ status: 'offer_deleted', offer });
      } catch (error) {
        res.status(422).json({ status: 'offer_not_deleted', error });
      }
      break;
    }
    case 'PUT': {
      try {
        const payload = req.body;
        offer = await updateOffer(offer.airtableId, payload);
        res.status(200).json({ status: 'offer_updated', offer });
      } catch (error) {
        res.status(422).json({ status: 'offer_not_updated', error });
      }
      break;
    }
    default:
      res.status(400);
  }
};
