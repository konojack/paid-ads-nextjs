import { unstable_getServerSession } from 'next-auth';
import { isAdmin } from 'services/offers/isAuthorized';
import { toggleActive } from 'services/offers/toggleActive';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!isAdmin(session)) {
    res.status(401).json({ status: 'not_authorized' });
  }

  switch (req.method) {
    case 'PUT': {
      try {
        const offer = await toggleActive(req.query.id);
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
