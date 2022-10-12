import Footer from 'components/Footer';
import TopNavigation from 'components/TopNavigation';

export default function BaseLayout({ children }) {
  return (
    <>
      <TopNavigation />
      {children}
      <Footer />
    </>
  );
}
