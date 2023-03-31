import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { ExploreBanner } from './ExploreBanner';
import { ProjectOverview } from './ProjectOverview';
import { CoinDetailCards } from './CoinDetailCards';
import { CoinInfos } from './CoinInfos';
import { MobileCoinStatus } from './MobileCoinStatus';
import { getProjectDetailsById } from 'src/Contracts';
import { coinDataProps } from 'src/Constant/interface';
import { useAccount } from 'wagmi';
import { useWeb3Store } from 'src/Context/Web3Context';

export const KingStarterExplore = () => {
  const [coinData, setCoinData] = useState<coinDataProps>();

  const { address } = useAccount();

  const { isConnected, isInitialized } = useWeb3Store();

  const params = new URLSearchParams(window.location.search);

  const getCoinData = async (id: number) => {
    const data = await getProjectDetailsById(id);
    setCoinData(data);
  };

  useEffect(() => {
    const id = params.get('id');
    console.log({ id });
    getCoinData(parseInt(id ?? '0'));
  }, []);
  return (
    <CoinExploreContainer>
      <MobileCoinStatus />
      <ExploreBanner data={coinData} />
      <ProjectOverview data={coinData} />
      <CoinDetailCards data={coinData} />
      <CoinInfos data={coinData} />
    </CoinExploreContainer>
  );
};

const CoinExploreContainer = styled(Box)(({ theme }) => ({}));
