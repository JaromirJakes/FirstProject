import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useWeb3Store } from 'src/Context/Web3Context';
import { getKingPadPresaleTotalContribution } from 'src/Contracts/kingSale';
import { RaisedProgressBar } from '../Progress/RaisedProgress';
import { SmallText } from '../Text/SmallText';

export const SoftHardCard = (props: { hardCap: number }) => {
  const { hardCap } = props;
  const [totalContribution, setTotalContribution] = useState(0);

  const { isConnected, isInitialized } = useWeb3Store();

  const fetchTotalContribution = async () => {
    const res = await getKingPadPresaleTotalContribution();
    // setTotalContribution(res);
  };

  useEffect(() => {
    if (isConnected) {
      fetchTotalContribution();
    }
  }, [isConnected, isInitialized]);

  return (
    <SoftHardCardContainer>
      <SmallText>Soft / Hard</SmallText>
      <SoftHardCardValue>150 BNB - 300 BNB</SoftHardCardValue>
      <RaisedProgressBar percentage={(totalContribution * hardCap) / 100} raised={totalContribution} />
    </SoftHardCardContainer>
  );
};
const SoftHardCardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '15px',
  boxShadow: '0px 3px 6px #00000029',
  padding: '31px 26px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: '26px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    gridColumn: 'inherit'
  }
}));

const SoftHardCardValue = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontFamily: 'gotham-bold',
  color: theme.palette.primary.contrastText
}));
