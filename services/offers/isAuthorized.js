const isOfferAuthorized = (offer, session) => {
  if (!session) return false;
  if (session.user.role == 'admin') return true;
  if (session.user.id == offer.users[0]) return true;

  return false;
};

export { isOfferAuthorized };
