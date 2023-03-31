import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { KingFilterButton } from 'src/Components/Button/KingFilterButton';
import { StatusFilterButton } from 'src/Components/Button/StatusFilterButton';
import { CoinCard } from 'src/Components/Cards/CoinCard';
import { KingpadCard } from 'src/Components/Cards/KingpadCard';
import { SafePlaceCard } from 'src/Components/Cards/SafePlaceCard';
import { KingpadAdCard } from 'src/Components/KingpadAdCard';
import { KingLogoIcon, HelmetIcon } from 'src/Config/Images';
import { KingStarterData } from 'src/Constant/arrayData';
import { CoinCardProps } from 'src/Constant/interface';
import { useStore } from 'src/Context/StoreContext';

export const Home = () => {
  const [tabs, setTabs] = useState(0);
  const [isKingStarter, setKingStarter] = useState(true);
  const { setPage } = useStore();
  const params = new URLSearchParams(window.location.search);
  const location = useLocation();

  console.log({ location });

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPage(0);
  }, []);

  const filterData =
    tabs !== 0
      ? KingStarterData.filter((item) => item.isKingStarter === isKingStarter && item.status === tabs)
      : KingStarterData.filter((item) => item.isKingStarter === isKingStarter);

  useEffect(() => {
    if (params.get('kingstarter') !== null) {
      if (filterRef.current !== null) {
        filterRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      if (params.get('kingstarter') === 'true') {
        setKingStarter(true);
      } else {
        setKingStarter(false);
      }
    }
  }, [filterRef, location]);

  return (
    <>
      <SafePlaceCard />
      <KingpadCards>
        <KingpadCard
          title="Driven by $KING"
          content="Kingpad is one of the branches of King Finance, allowing our currency King to keep its deflationary nature."
          btnTitle="Discover"
          icon={KingLogoIcon}
        />
        <KingpadCard
          title="Want to launch on KingPad?"
          content="Make sure to go through our vetting processes if you wish to launch with us."
          btnTitle="Apply now"
          icon={HelmetIcon}
        />
      </KingpadCards>
      <KingpadAdCard />
      <CoinCardFilter id="filter" ref={filterRef}>
        <KingFilter>
          <KingFilterButton name="kingstarter" onClick={() => setKingStarter(true)} isDisabled={!isKingStarter} />
          <KingFilterButton name="kingsale" onClick={() => setKingStarter(false)} isDisabled={isKingStarter} />
        </KingFilter>
        <StatusFilter>
          <StatusFilterButton name="All" onClick={() => setTabs(0)} isDisabled={tabs !== 0} />
          <StatusFilterButton name="Upcoming" color="#FFB060" onClick={() => setTabs(1)} isDisabled={tabs !== 1} />
          <StatusFilterButton name="On going" color="#00FE9A" onClick={() => setTabs(2)} isDisabled={tabs !== 2} />
          <StatusFilterButton name="Ended" color="#FF4056" onClick={() => setTabs(3)} isDisabled={tabs !== 3} />
        </StatusFilter>
      </CoinCardFilter>
      <CoinCards>
        {filterData.map((card: CoinCardProps) => (
          <CoinCard
            isKingStarter={card.isKingStarter}
            status={card.status}
            coinImg={card.coinImg}
            coinName={card.coinName}
            raisedValue={card.raisedValue}
            progress={card.progress}
            softCap={card.softCap}
            hardCap={card.hardCap}
            time={card.time}
            key={card.id}
            id={card.id}
          />
        ))}
      </CoinCards>
      <CardActions>
        <ShowmoreButton variant="outlined">Show more</ShowmoreButton>
      </CardActions>
    </>
  );
};

const KingpadCards = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  gap: '14px',
  marginTop: '17px',
  [theme.breakpoints.down('mobile')]: {
    gridTemplateColumns: 'auto'
  }
}));

const CoinCardFilter = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '23px',
  margin: '17px 0',
  padding: '8px',
  [theme.breakpoints.down(768)]: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '15px',
    gap: '16px'
  }
}));

const CardTab = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontFamily: 'gotham-bold',
  fontSize: '16px',
  cursor: 'pointer',

  [theme.breakpoints.down('ls')]: {
    fontSize: '14px'
  }
}));

const CoinCards = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto auto auto',
  gap: '12px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  [theme.breakpoints.down(1470)]: {
    gridTemplateColumns: 'auto auto'
  },
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const CardActions = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  margin: '50px 0'
}));

const ShowmoreButton = styled(Button)(({ theme }) => ({
  borderRadius: '19px',
  width: '155px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'none',
  fontSize: '15px',
  fontFamily: 'gotham-bold',
  color: theme.palette.secondary.contrastText,
  borderColor: theme.palette.secondary.contrastText,
  '&:hover': {
    color: theme.palette.secondary.contrastText,
    borderColor: theme.palette.secondary.contrastText
  },
  [theme.breakpoints.down('md')]: {
    width: '120px',
    height: '30px',
    fontSize: '13px'
  }
}));

const KingFilter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5.5px'
}));

const StatusFilter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5.5px',
  [theme.breakpoints.down(460)]: {
    display: 'grid',
    gridTemplateColumns: 'auto auto'
  }
}));
