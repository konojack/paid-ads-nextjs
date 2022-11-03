const isOfferAuthorized = (offer, session) => {
  if (!session) return false;
  if (session.user.role == 'admin') return true;
  if (session.user.id == offer.users[0]) return true;

  return false;
};

const isAdmin = (session) => {
  if (!session || session.user.role !== 'admin') return false;
  return true;
};

export { isOfferAuthorized, isAdmin };
