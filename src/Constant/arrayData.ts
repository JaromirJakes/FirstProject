import { CoinCardProps } from "./interface";

// 0: all, 1: upcoming, 2: ongong, 3: ended

export const KingStarterData: CoinCardProps[] = [
  {
    id: 1, 
    isKingStarter: true,
    status: 1,
    coinImg: '',
    coinName: 'Coin name',
    raisedValue: 0,
    time: '10:13:05:21'
  },
  {
    id: 2, 
    isKingStarter: true,
    status: 2,
    coinImg: '',
    coinName: 'Coin name',
    raisedValue: 135,
    time: '10:13:05:21'
  },
  {
    id: 3, 
    isKingStarter: true,
    status: 3,
    coinImg: '',
    coinName: 'Coin name',
    raisedValue: 135
  },
  {
    id: 4, 
    isKingStarter: false,
    status: 1,
    coinImg: '',
    coinName: 'Coin name',
    progress: 0,
    softCap: 135,
    hardCap: 270,
    time: '10:13:05:21'
  },
  {
    id: 5, 
    isKingStarter: false,
    status: 2,
    coinImg: '',
    coinName: 'Coin name',
    progress: 35,
    softCap: 135,
    hardCap: 270,
    time: '10:13:05:21'
  },
  {
    id: 6, 
    isKingStarter: false,
    status: 3,
    coinImg: '',
    coinName: 'Coin name',
    progress: 100,
    softCap: 135,
    hardCap: 270,
    time: '10:13:05:21'
  }
];
