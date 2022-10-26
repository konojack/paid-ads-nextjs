import getRecentOffers from 'services/offers/getRecent';
import createOffer from 'services/offers/create';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const offers = await getRecentOffers(6);
      res.status(200).json(offers);
      break;
    }
    case 'POST': {
      const session = await unstable_getServerSession(req, res, authOptions);

      try {
        if (!session) {
          res.status(401).json({ status: 'not_logged_in' });
        }

        const payload = req.body;
        const userId = session.user.id;
        const offer = await createOffer(payload, userId);
        res.status(200).json({ status: 'created', offer });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }

      break;
    }
    default:
      res.status(400);
  }
};
