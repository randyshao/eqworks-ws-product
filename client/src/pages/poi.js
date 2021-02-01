import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';
import Map from '../components/Map/Map';

const DailyEvents = ({ stats }) => {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Map stats={stats} />
    </Layout>
  );
};

export default DailyEvents;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5555/poi');
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
