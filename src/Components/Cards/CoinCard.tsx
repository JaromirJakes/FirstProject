import {
  CheckCircle,
  LockOutlined,
  NoEncryptionGmailerrorredOutlined,
  Language,
  Twitter,
  Telegram,
  YouTube,
  Instagram
} from '@mui/icons-material';
import { FaFacebookF, FaDiscord } from 'react-icons/fa';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { CircularProgressBar } from '../Progress/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { CoinCardProps } from 'src/Constant/interface';
import { KingFilterButton } from '../Button/KingFilterButton';
import { StatusFilterButton } from '../Button/StatusFilterButton';
import { CoinStatusOnlyIcon } from '../CoinStatus';
import { RaisedCircle } from '../Progress/RaisedCircle';
import { PUBLIC_ROUTES } from 'src/Config/routes';

// status 1: upcoming, 2: ongong, 3: ended

export const CoinCard = (props: CoinCardProps) => {
  const { isKingStarter, status, coinImg, coinName, raisedValue, progress, softCap, hardCap, time } = props;

  const navigate = useNavigate();

  return (
    <CardContainer>
      <StatusContainer>
        <KingStatus>
          {isKingStarter ? (
            <KingFilterButton name="kingstarter" />
          ) : (
            <KingFilterButton name="kingsale" isDisabled={true} isOpacity={false} />
          )}
          {status === 1 && <StatusFilterButton name="Upcoming" color="#FFB060" />}
          {status === 2 && <StatusFilterButton name="On going" color="#00FE9A " />}
          {status === 3 && <StatusFilterButton name="Ended" color="#FF4056" />}
        </KingStatus>
        <CoinStatusOnlyIcon />
      </StatusContainer>
      <TokenInfo>
        <TokenLogo></TokenLogo>
        <TokenDetails>
          <TokenName>{coinName}</TokenName>
          <TokenLinks>
            <TokenLink href="/" rel="noopener noreferrer">
              <Language sx={{ width: '18px', height: '18px' }} />
            </TokenLink>
            <TokenLink href="/" rel="noopener noreferrer">
              <Twitter sx={{ width: '18px', height: '18px' }} />
            </TokenLink>
            <TokenLink href="/" rel="noopener noreferrer">
              <Telegram sx={{ width: '18px', height: '18px' }} />
            </TokenLink>
            <TokenLink href="/" rel="noopener noreferrer">
              <YouTube sx={{ width: '18px', height: '18px' }} />
            </TokenLink>
            <TokenLink href="/" rel="noopener noreferrer">
              <FaDiscord style={{ width: '18px', height: '18px' }} />
            </TokenLink>
            <TokenLink href="/" rel="noopener noreferrer">
              <FaFacebookF style={{ width: '14px', height: '14px' }} />
            </TokenLink>
            <TokenLink href="/" rel="noopener noreferrer">
              <Instagram sx={{ width: '18px', height: '18px' }} />
            </TokenLink>
          </TokenLinks>
        </TokenDetails>
      </TokenInfo>
      <TokenProgress>
        <TokenProgressGraph>
          {isKingStarter ? (
            <RaisedCircle raised={raisedValue ?? 0} />
          ) : (
            <CircularProgressBar percentage={progress ?? 0} />
          )}
        </TokenProgressGraph>
        {!isKingStarter && (
          <CapContainer>
            <ShowCap isSoft={true} value={softCap ?? 0} />
            <ShowCap isSoft={false} value={hardCap ?? 0} />
          </CapContainer>
        )}
      </TokenProgress>
      <TokenAction>
        <TokenLaunch>
          {status === 0 ? (
            <TokenLaunchTitle>Sale starts in</TokenLaunchTitle>
          ) : status === 1 ? (
            <TokenLaunchTitle>Sale ends in</TokenLaunchTitle>
          ) : (
            <TokenLaunchTitle>Sale ended</TokenLaunchTitle>
          )}
          <TokenLaunchTime>{time != null ? time : '-'}</TokenLaunchTime>
        </TokenLaunch>
        {isKingStarter ? (
          <TokenExplorer onClick={() => navigate('/kingstarter-explore?id=1')}>Explore</TokenExplorer>
        ) : (
          <TokenExplorer onClick={() => navigate('/kingsale-explore?id=1')}>Explore</TokenExplorer>
        )}
      </TokenAction>
    </CardContainer>
  );
};

const CardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  padding: '22px 25px',
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  maxWidth: '385px',
  [theme.breakpoints.down('desktop')]: {
    padding: '15px'
  }
}));

const StatusContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '30px',
  [theme.breakpoints.down(385)]: {
    flexDirection: 'column',
    gap: '15px'
  }
}));

interface CheckmarkProps {
  children: React.ReactNode;
}

const Checkmark = (props: CheckmarkProps) => {
  return (
    <CheckmarkContainer>
      <CheckCircle sx={{ width: '18px', height: '18px', color: '#09A0FF' }} />
      {props.children}
    </CheckmarkContainer>
  );
};

const AuthContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px'
}));

const CheckmarkContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '6.5px',
  alignItems: 'center',
  fontSize: '11px',
  fontFamily: 'gotham-bold'
}));

const Presale = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  color: theme.palette.primary.contrastText,
  fontFamily: 'gotham-bold',
  fontSize: '13px',
  width: '82px',
  height: '22px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const StatusType = styled(Box)(({ theme }) => ({
  fontSize: '13px',
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  gap: '9px'
}));

const StatusButton = styled(Button)(({ theme }) => ({
  fontSize: '13px',
  borderRadius: '20px',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: 0,
  paddingBottom: 0,
  color: '#FFFFFF',
  textTransform: 'none',
  width: '82px',
  height: '22px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const TokenInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '9px',
  alignItems: 'center'
}));

const TokenLogo = styled(Box)(({ theme }) => ({
  minWidth: '87px',
  minHeight: '87px',
  backgroundColor: '#00AEF0',
  borderRadius: '50%'
}));

const TokenDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
}));

const TokenName = styled(Box)(({ theme }) => ({
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText,
  fontSize: '20px'
}));

const TokenLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '5px',
  flexWrap: 'wrap'
}));

const TokenLink = styled('a')(({ theme }) => ({
  color: '#8462F6',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const TokenProgress = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '70px',
  [theme.breakpoints.down(390)]: {
    gap: '30px'
  }
}));

const TokenProgressTitle = styled(Box)(({ theme }) => ({
  color: '#8462F6',
  fontFamily: 'gotham-bold',
  fontSize: '16px'
}));

const TokenProgressValue = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontFamily: 'gotham-bold',
  color: theme.palette.dark.contrastText
}));

const TokenProgressGraph = styled(Box)(({ theme }) => ({
  width: '180px',
  height: '180px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center'
}));

const TokenAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const TokenLaunch = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
}));

const TokenLaunchTitle = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  color: '#8462F6',
  fontFamily: 'gotham-bold'
}));

const TokenLaunchTime = styled(Box)(({ theme }) => ({
  fontSize: '15px',
  color: theme.palette.dark.contrastText,
  fontFamily: 'gotham-bold'
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

const StatusLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '13px',
  fontFamily: 'gotham-book',
  height: '18px',
  lineHeight: '18px'
}));

const KingStatus = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4.5px'
}));

const CapContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px'
}));

const ShowCap = (props: { isSoft: boolean; value: number }) => {
  const { isSoft, value } = props;

  return (
    <ShowCapContainer>
      <ShowCapText>{isSoft ? 'Soft Cap' : 'Hard Cap'}</ShowCapText>
      <ShowCapValue>{value}</ShowCapValue>
      <BNBText>BNB</BNBText>
    </ShowCapContainer>
  );
};

const ShowCapContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const ShowCapText = styled(Box)(({ theme }) => ({
  color: '#8462F6',
  fontSize: '12px'
}));

const ShowCapValue = styled(Box)(({ theme }) => ({
  fontFamily: 'gotham-bold',
  fontSize: '30px'
}));

const BNBText = styled(Box)(({ theme }) => ({
  fontSize: '13px',
  fontFamily: 'gotham-bold'
}));
