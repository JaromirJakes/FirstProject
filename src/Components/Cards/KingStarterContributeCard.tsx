/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import { kingStarterDeposit, contributeWithdraw, getPsaleDeposit } from 'src/Contracts/kingStarter';
import { ethers } from 'ethers';
import { isTest, token_address } from 'src/Config/general';
import { useAccount } from 'wagmi';
import { useWeb3Store } from 'src/Context/Web3Context';
import { handleContractFunction } from 'src/Utils/handleContract';

interface CardProps {
  status: number;
  minBuy?: string | number;
  maxBuy?: string | number;
  currency?: string;
  tokenAddress?: string;
}

export const KingStarterContributeCard = (props: CardProps) => {
  const { status, minBuy, maxBuy, currency, tokenAddress } = props;
  const [buyVal, setBuyVal] = useState(1);
  const [contributeValue, setContributeValue] = useState(0);
  const { address } = useAccount();
  const { isConnected, isInitialized } = useWeb3Store();
  const [isLoad, setLoad] = useState(false);
  const buyRef = useRef<HTMLInputElement>(null);
  const handleChangeValue = (val: string) => {
    setBuyVal(parseFloat(val));
  };

  const handleInputAreaClick = () => {
    buyRef.current?.focus();
  };

  const handleBuy = async () => {
    if (minBuy !== undefined && maxBuy !== undefined && currency !== undefined) {
      if (buyVal < minBuy) {
        toast.error(`Amount should be more than ${minBuy} ${currency}`);
      } else if (buyVal > maxBuy) {
        toast.error(`Amount should be less than ${maxBuy} ${currency}`);
      } else {
        if (tokenAddress !== undefined) {
          const tokenAddy = isTest ? token_address : tokenAddress;
          handleContractFunction(async () => await kingStarterDeposit(currency, buyVal, tokenAddy), setLoad);
        }
      }
    }
  };

  const getContributeValue = async (userAddy: string) => {
    const tokenAddy = isTest ? token_address : tokenAddress;
    if (tokenAddy !== undefined) {
      console.log({ tokenAddy, userAddy });
      const val = await getPsaleDeposit(tokenAddy, userAddy);
      if (val !== undefined) {
        setContributeValue(val);
      }
    }
  };

  const handleWithdraw = async () => {
    const tokenAddy = isTest ? token_address : tokenAddress;
    if (tokenAddy !== undefined) {
      handleContractFunction(async () => await contributeWithdraw(tokenAddy), setLoad);
    }
  };

  useEffect(() => {
    if (isConnected && isInitialized && address !== undefined) {
      console.log({ isConnected, isInitialized, address });
      getContributeValue(address);
    }
  }, [isConnected, isInitialized]);

  return (
    <CardBox about="Contribute-Card" status={status}>
      <CardLabel>Contriubte now</CardLabel>
      <CardButtonGroup>
        <InputBox onClick={handleInputAreaClick}>
          <Input
            disabled={status !== 0}
            type="number"
            ref={buyRef}
            value={buyVal}
            onChange={(e: React.FormEvent<HTMLInputElement>) => handleChangeValue(e.currentTarget.value)}
          />
          <ValueLabel>{currency}</ValueLabel>
        </InputBox>
        <CardButton onClick={async () => await handleBuy()}>Buy</CardButton>
      </CardButtonGroup>
      <PurchasedContainer>
        <Purchased name="Min buy" value={minBuy} currency={currency} />
        <Purchased name="Max buy" value={maxBuy} currency={currency} />
      </PurchasedContainer>
      <CardLabel>Your contribution</CardLabel>
      <ValueLabel>
        {contributeValue} {currency}
      </ValueLabel>
      {/* disabled={status !== 0} */}
      <WithdrawButton onClick={async () => await handleWithdraw()}>Withdraw</WithdrawButton>
    </CardBox>
  );
};

const CardBox = styled(Box)<{ status: number }>(({ theme, status }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '35px',
  width: '100%',
  backgroundColor: '#1E0041',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '15px',
  opacity: status === 0 ? 1 : 0.6
}));

const CardLabel = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  color: '#8462F6',
  fontWeight: '600'
}));

const CardButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '5px',
  paddingTop: '11px'
}));

const InputBox = styled(Box)(({ theme }) => ({
  border: '1px solid #FFFFFF',
  color: '#FFFFFF',
  fontSize: '15px',
  borderRadius: '32px',
  fontFamily: 'gotham-bold',
  padding: '5px 34px',
  textTransform: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'text',
  '&:hover': {
    border: '1px solid #FFFFFF'
  },
  [theme.breakpoints.down(1200)]: {
    padding: '0px 25px'
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '12px'
  },
  [theme.breakpoints.down(370)]: {
    fontSize: '9px'
  }
}));

const Input = styled('input')(({ theme }) => ({
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  textAlign: 'center',
  width: '30px',
  height: '34px',
  fontSize: '15px',
  padding: '5px 0',
  fontFamily: 'gotham-bold',
  color: '#ffffff'
}));

const CardButton = styled(Button)(({ theme }) => ({
  borderRadius: '32px',
  fontSize: '15px',
  backgroundColor: 'transparent',
  fontFamily: 'gotham-bold',
  padding: '5px 34px',
  textTransform: 'none',
  color: '#FFFFFF',
  border: '2px solid #00FE9A',
  '&:hover': {
    backgroundColor: 'transparent'
  },
  '&:disabled': {
    color: '#FFFFFF'
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '12px'
  }
}));

const PurchasedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '42px',
  padding: '16px 0 32px 0',
  [theme.breakpoints.down('xs')]: {
    gap: '20px'
  }
}));

interface PurchasedProps {
  name: string;
  value?: string | number;
  currency?: string;
}

const Purchased = (props: PurchasedProps) => {
  return (
    <PurchasedWrapper>
      <PurchasedName>{props.name}</PurchasedName>
      <PurchasedValue>
        {props.value} {props.currency}
      </PurchasedValue>
    </PurchasedWrapper>
  );
};

const PurchasedWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const PurchasedName = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  color: '#8462F6',
  fontFamily: 'gotham-bold'
}));

const PurchasedValue = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontFamily: 'gotham-bold',
  color: '#FFFFFF'
}));

const ValueLabel = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontFamily: 'gotham-bold',
  color: '#FFFFFF',
  padding: '5px 0'
}));

const WithdrawButton = styled(Button)(({ theme }) => ({
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
  '&:disabled': {
    color: '#FFFFFF'
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '12px'
  }
}));
