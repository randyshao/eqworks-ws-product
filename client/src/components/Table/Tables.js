import EventsHourly from './EventsHourly';
import EventsDaily from './EventsDaily';
import StatsHourly from './StatsHourly';
import StatsDaily from './StatsDaily';
import styles from './Table.module.css';
import { useState } from 'react';
import classname from 'classnames';

const Tables = () => {
  const tabs = [
    {
      title: 'Table 1',
      tabName: <EventsDaily />,
    },
    {
      title: 'Table 2',
      tabName: <EventsHourly />,
    },
    {
      title: 'Table 3',
      tabName: <StatsDaily />,
    },
    {
      title: 'Table 4',
      tabName: <StatsHourly />,
    },
  ];

  const Tabgroup = () => {
    const [active, setActive] = useState(tabs[0].tabName);
    return (
      <div>
        <nav className={styles.TabGroup}>
          {tabs.map((tab) => (
            <button
              className={classname(styles.Tab, {
                [styles.active]: active === tab.tabName,
              })}
              key={tab.title}
              onClick={() => setActive(tab.tabName)}
            >
              {tab.title}
            </button>
          ))}
        </nav>
        {active}
      </div>
    );
  };

  return (
    <div>
      <Tabgroup />
    </div>
  );
};

export default Tables;
