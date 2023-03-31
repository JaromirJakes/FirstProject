import { Box, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { KingpadAdBackground, KingpadAdLogo } from 'src/Config/Images';

export const KingpadAdCard = () => {
  return (
    <KingpadAdCardContainer>
      <KingpadAdImage src={KingpadAdBackground} alt="kingpad-ad-image" />
      <KingpadAdContent>
        <AdContentTitle>Don’t miss the upcoming launch on Kingpad</AdContentTitle>
        <AdContentImage src={KingpadAdLogo} alt="ad-image" />
        <EndInContainer>
          <CardLabel>Starts in</CardLabel>
          <EndInTimeContainer>
            <EndInTime name="Days" value={'02'} />
            <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6', height: '35px' }} />
            <EndInTime name="Hours" value={'12'} />
            <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6', height: '35px' }} />
            <EndInTime name="Minutes" value={'55'} />
            <Divider orientation="vertical" sx={{ backgroundColor: '#8462F6', height: '35px' }} />
            <EndInTime name="Seconds" value={'31'} />
          </EndInTimeContainer>
        </EndInContainer>
        <TokenExplorer>Explore</TokenExplorer>
      </KingpadAdContent>
    </KingpadAdCardContainer>
  );
};

const KingpadAdCardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  background: '#1E0041 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  marginTop: '17px',
  display: 'flex',
  gap: '20px',
  [theme.breakpoints.down(860)]: {
    flexDirection: 'column'
  }
}));

const KingpadAdImage = styled('img')(({ theme }) => ({
  width: '50%',
  background: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  objectFit: 'cover',
  borderRadius: '15px 0 0 15px',
  [theme.breakpoints.down(860)]: {
    width: '100%',
    height: '247px'
  }
}));

const KingpadAdContent = styled(Box)(({ theme }) => ({
  width: '50%',
  //   height: '408px',
  padding: '41px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '25px',
  justifyContent: 'space-between',
  [theme.breakpoints.down(860)]: {
    width: '100%',
    // height: '350px',
    padding: '20px',
    gap: '10px'
  }
}));

const AdContentTitle = styled(Box)(({ theme }) => ({
  fontSize: '30px',
  fontFamily: 'gotham-bold',
  color: '#FFFFFF',
  textAlign: 'center',
  width: '410px',
  [theme.breakpoints.down(1396)]: {
    fontSize: '24px',
    width: '320px'
  },
  [theme.breakpoints.down(1260)]: {
    fontSize: '22px'
  },
  [theme.breakpoints.down(350)]: {
    width: '270px'
  }
}));

const AdContentImage = styled('img')(({ theme }) => ({
  width: '110px',
  height: '62px'
}));

const EndInContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const CardLabel = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  color: '#8462F6',
  fontWeight: '600'
}));

const EndInTimeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  alignItems: 'center',
  paddingTop: '18px',
  color: '#8462F6',
  [theme.breakpoints.down('sm')]: {
    gap: '12px'
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
  value: number | string | undefined;
}

const EndInTimeWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const EndInTimeValue = styled(Box)(({ theme }) => ({
  fontSize: '26px',
  color: '#FFFFFF',
  fontWeight: '600',
  letterSpacing: '-0.26px',
  lineHeight: '25px'
}));

const EndInTimeName = styled(Box)(({ theme }) => ({
  fontSize: '8px',
  color: '#8462F6',
  textTransform: 'uppercase'
}));

const TokenExplorer = styled(Button)(({ theme }) => ({
  width: '84px',
  height: '36px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '19px',
  backgroundColor: '#8462F6',
  color: '#FFFFFF',
  textTransform: 'none',
  '&.MuiButtonBase-root:hover': {
    backgroundColor: '#8462F6'
  }
}));
