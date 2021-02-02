import Layout from '../components/Layout';
import Map from '../components/Map';

const DailyEvents = ({ stats }) => {
  return (
    <Layout>
      <Map stats={stats} />
    </Layout>
  );
};

export default DailyEvents;

export const getStaticProps = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/poi');
  const stats = await res.json();

  if (!stats) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      stats,
    },
  };
};
