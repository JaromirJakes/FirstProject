import { useEffect, useState } from 'react';
import { Circle, StarBorder } from '@mui/icons-material';
import { Box, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { getContributeValue } from 'src/Contracts/kingStarter';
import { useAccount } from 'wagmi';
import { useWeb3Store } from 'src/Context/Web3Context';
import { KingFilterButton } from '../Button/KingFilterButton';

export const KingstarterStatusCard = (props: { status: number; currency: string }) => {
  const { status, currency } = props;
  const { address } = useAccount();
  const { isConnected, isInitialized } = useWeb3Store();
  const [raisedValue, setRaisedValue] = useState('0');

  const fetchTotalContribution = async () => {
    if (address !== undefined) {
      const res = await getContributeValue(address);
      setRaisedValue(res ?? '0');
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchTotalContribution();
    }
  }, [isConnected, isInitialized]);

  return (
    <CardBox about="Ends-In-Card">
      <CardButtonGroup>
        <KingFilterButton name="kingstarter" />
        <OngoingButton>
          {status === 0 && (
            <>
              <Circle sx={{ width: '18px', height: '18px', color: '#00FE9A' }} />
              On going
            </>
          )}
          {status === 1 && (
            <>
              <Circle sx={{ width: '18px', height: '18px', color: '#fdac52' }} />
              Upcoming
            </>
          )}
          {status === 2 && (
            <>
              <Circle sx={{ width: '18px', height: '18px', color: '#fc1e42' }} />
              Ended
            </>
          )}
        </OngoingButton>
      </CardButtonGroup>
      <RaisedContainer>
        <RaisedLabel>Raised</RaisedLabel>
        <RaisedValue>{status === 1 ? '-' : `${raisedValue} ${currency}`}</RaisedValue>
      </RaisedContainer>
      <EndInContainer>
        <CardLabel>
          {status === 0 && 'Ends In'}
          {status === 1 && 'Starts in'}
          {status === 2 && 'Kingstarted ended'}
        </CardLabel>
        {status === 2 ? (
          <Kingsale>Visit Kingsale</Kingsale>
        ) : (
          <EndInTimeContainer>
            <EndInTime name="Days" value={34} />
            <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6' }} />
            <EndInTime name="Hours" value={12} />
            <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6' }} />
            <EndInTime name="Minutes" value={55} />
            <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6' }} />
            <EndInTime name="Seconds" value={31} />
          </EndInTimeContainer>
        )}
      </EndInContainer>
    </CardBox>
  );
};

const CardBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: '35px',
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  gap: '20px'
}));

const CardButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '2.5px'
}));

const KingStarterButton = styled(Button)(({ theme }) => ({
  fontSize: '12px',
  borderRadius: '20px',
  textTransform: 'uppercase',
  height: '27px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2px',
  backgroundColor: '#8462F6',
  color: '#FFFFFF',
  fontFamily: 'gotham-book',
  '&:hover': {
    backgroundColor: '#8462F6'
  },
  [theme.breakpoints.down(370)]: {
    fontSize: '10px'
  }
}));

const OngoingButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  color: theme.palette.primary.contrastText,
  fontFamily: 'gotham-bold',
  fontSize: '13px',
  height: '27px',
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  textTransform: 'none',
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  border: `1px solid ${theme.palette.primary.contrastText}`,
  [theme.breakpoints.down(370)]: {
    fontSize: '9px'
  }
}));

const EndInTimeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  alignItems: 'center',
  paddingTop: '18px',
  color: '#8462F6',
  [theme.breakpoints.down('sm')]: {
    gap: '9px'
  }
}));

const EndInTime = (props: EndInTimeProps) => {
  return (
    <EndInTimeWrapper>
      <EndInTimeValue>{props.value}</EndInTimeValue>
      <EndInTimeName>{props.name}</EndInTimeName>
    </EndInTimeWrapper>
  );
};

interface EndInTimeProps {
  name: string;
  value: number;
}

const EndInTimeWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const EndInTimeValue = styled(Box)(({ theme }) => ({
  fontSize: '26px',
  color: theme.palette.primary.contrastText,
  fontWeight: '600',
  letterSpacing: '-0.26px',
  lineHeight: '25px'
}));

const EndInTimeName = styled(Box)(({ theme }) => ({
  fontSize: '8px',
  color: '#8462F6',
  textTransform: 'uppercase'
}));

const CardLabel = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  color: '#8462F6',
  fontWeight: '600'
}));

const RaisedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px'
}));

const RaisedLabel = styled(Box)(({ theme }) => ({
  fontSize: '13px',
  color: '#8462F6',
  fontFamily: 'gotham-bold'
}));

const RaisedValue = styled(Box)(({ theme }) => ({
  fontSize: '25px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText
}));

const EndInContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px'
}));

const Kingsale = styled(Button)(({ theme }) => ({
  borderRadius: '32px',
  fontSize: '15px',
  backgroundColor: '#8462F6',
  fontFamily: 'gotham-bold',
  padding: '5px 34px',
  textTransform: 'none',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#8462F6'
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '12px'
  }
}));
