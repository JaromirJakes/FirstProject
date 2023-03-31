import axios from 'axios';
import { BigNumber, Contract, ethers } from 'ethers';
import { apiName, KINGpassAddress, kingStarterAddress } from 'src/Config/general';
import { isEmpty } from 'src/Utils/validator';
import KingStarterContract from './Json/KingStarter.json'
import bep20ABI from './Json/bep20ABI.json'

let kingStarter: Contract;
let baseBep20: Contract;
let provider: any = null;
let signer: any = null;

export const kingStarterInitialize = async (provider_: any, signer_: any) => {
    console.log("kingStarterInitialize")
    kingStarter = new ethers.Contract(kingStarterAddress, KingStarterContract.abi, signer_);
    baseBep20 = new ethers.Contract(KINGpassAddress, bep20ABI, signer_);
    provider = provider_;
    signer = signer_;
}

export const createPresale = async () => {
  const response = await axios.get(`https://${apiName}.kingpad.finance/create_kingsale_data?id=1`);
  const res = response.data;
  if(res !== undefined) {
    console.log("createPresale", { res });
    await kingStarter.createPassSale(res[0], res[1], res[2], res[3], res[4], res[5]);
  }
}

export const getContributeValue = async (userAddress: string | undefined) => {
  if(!isEmpty(userAddress) && !isEmpty(provider)) {
    const tx = await kingStarter.getTotalContribution(userAddress);
    const totalContrubute = ethers.utils.formatEther(tx)
    return totalContrubute;
  }
}

export const getTokenInfo = async (addy: string) => {
    const tokenName = await baseBep20.attach(addy).name();
    const tokenSymbol = await baseBep20.attach(addy).symbol();
    const tokenDecimal = await baseBep20.attach(addy).decimals();
    
    return { tokenName, tokenSymbol, tokenDecimal }
}

export const kingStarterDeposit = async (currency: string, amount_: number, saleTokenAddress: string) => {
  const amount = ethers.utils.parseEther(amount_.toString());
  if(!isEmpty(kingStarter) && !isEmpty(signer)) {
    if(currency === 'BNB') {
      await kingStarter.depositPassSale(0, saleTokenAddress, { value: amount });
    } else {
      const bnbAddress = await kingStarter.viewKingstarterCurrecy(saleTokenAddress);
      const tx = await baseBep20.attach(bnbAddress).approve(kingStarterAddress, amount);
      await tx.wait();
      await kingStarter.depositPassSale(amount, saleTokenAddress, { value: 0 });
    }
  }
}

export const getPsaleDeposit = async (saleTokenAddress: string, userAddress: string) => {
  if(!isEmpty(provider) && !isEmpty(kingStarter)) {
    const tx = await kingStarter.returnPsaleUserDeposit(saleTokenAddress, userAddress);
    const res = tx.toString();
    return res;
  }
}

export const contributeWithdraw = async (saleTokenAddress: string) => {
  if(!isEmpty(provider) && !isEmpty(kingStarter)) {
    const tx = await kingStarter.exitPassSale(saleTokenAddress);
    await tx.wait();
  }
}
