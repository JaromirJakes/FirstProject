import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { coinDataProps } from 'src/Constant/interface';
import { getUserPassActive } from 'src/Contracts';
import { useAccount } from 'wagmi';
import { useWeb3Store } from 'src/Context/Web3Context';
import { SoftHardCard } from 'src/Components/Cards/SoftHardCard';
import { KingsaleStatusCard } from 'src/Components/Cards/KingsaleStatusCard';
import { KingSaleContributeCard } from 'src/Components/Cards/KingsaleContributeCard';

export const CoinDetailCards = (props: { data?: coinDataProps }) => {
  const { data } = props;
  const [status, setStatus] = useState(0); // 0: ongoing 1: upcoming 2: ended

  const { address } = useAccount();
  const { isConnected, isInitialized } = useWeb3Store();
  const [hasKing, setHasKing] = useState(false);
  const [currency, setCurrency] = useState('BNB');

  const getUserActive = async () => {
    if (address !== undefined) {
      const _hasKing = await getUserPassActive(address);
      setHasKing(_hasKing);
    }
  };

  useEffect(() => {
    console.log({ data });
    getKingStarterStatus();
    setCurrency(data?.currency ?? 'BNB');
  }, [data]);

  const getKingStarterStatus = () => {
    const now = new Date(Date.now()).getTime();
    const time1 = new Date(data?.kingpass_start ?? 0).getTime();
    const time2 = new Date(data?.kingpass_end ?? 0).getTime();
    let _status = 2;
    if (now < time1) {
      _status = 1;
    } else if (now >= time1 && time2 >= now) {
      _status = 0;
    } else if (now > time2) {
      _status = 2;
    }
    setStatus(_status);
  };

  useEffect(() => {
    if (isConnected) {
      getUserActive();
    }
  }, [isInitialized, isConnected]);

  return (
    <CoinDetailCardsBox>
      <KingsaleStatusCard status={status} currency={currency} />
      {/* <KingpassholderCard status={status} isKing={hasKing} /> */}
      <SoftHardCard hardCap={data?.hard_cap ?? 0} />
      <KingSaleContributeCard
        status={!hasKing ? 1 : status}
        minBuy={data?.min_contribution}
        maxBuy={data?.max_contribution}
        currency={data?.currency}
        tokenAddress={data?.token_address}
      />
    </CoinDetailCardsBox>
  );
};

const CoinDetailCardsBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  width: '100%',
  gap: '14px',
  paddingTop: '17px',
  [theme.breakpoints.down(1390)]: {
    gridTemplateColumns: 'repeat(2, 2fr)',
    '&>*:nth-child(1)': {
      gridColumn: '1 / 3'
    }
  },
  [theme.breakpoints.down(720)]: {
    display: 'flex',
    flexDirection: 'column'
  }
}));
