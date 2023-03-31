export interface coinDataProps {
  project_name: string;
  project_owner: string;
  chain_id: 0;
  token_address: string;
  name: string;
  symbol: string;
  decimals: number;
  total_supply: 0;
  currency: string;
  router: string;
  presale_rate: 0;
  listing_rate: 0;
  soft_cap: 0;
  hard_cap: 0;
  min_contribution: 0;
  max_contribution: 0;
  kingpass_min_contribution: 0;
  kingpass_max_contribution: 0;
  liquidity_percentage: 0;
  liquidity_lock_days: 0;
  refund_type: string;
  presale_start: string;
  presale_end: string;
  kingpass_start: string;
  kingpass_end: string;
  whitelist_enabled: number;
  vesting_enabled: number;
  vesting_first_release_amount: number;
  vesting_period_each_cycle_days: number;
  vesting_release_each_cycle_percentage: number;
  logo: string;
  cover_image: string;
  youtube_video: string;
  website: string;
  telegram: string;
  twitter: string;
  youtube: string;
  facebook: string;
  discord: string;
  instagram: string;
  description: string
}

export interface projectSettingProps {
  id: number;
  presale_type: string;
  currency_address: string;
  redistribution: Array<{
    name: string;
    value: string;
  }>;
}

export interface tokenDataProps {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface CoinCardProps {
  id: number;
  isKingStarter: boolean;
  status: number; // 0: all, 1: upcoming, 2: ongong, 3: ended
  coinImg: string;
  coinName: string;
  raisedValue?: number;
  progress?: number;
  softCap?: number;
  hardCap?: number;
  time?: string;
}