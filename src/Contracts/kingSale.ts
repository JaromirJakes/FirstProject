import { Contract, ethers } from "ethers";
import { kingStarterAddress, KINGpassAddress, kingPadFactoryAddress, token_address } from "src/Config/general";
import { isEmpty } from "src/Utils/validator";
import KingpadPresaleContract from './Json/KingPadPresale.json'
import KingStarterContract from './Json/KingStarter.json'
import KingpadFactryContract from './Json/KingpadFactory.json'
import bep20ABI from './Json/bep20ABI.json'

let kingStarter: Contract;
let kingpadFactory: Contract;
let kingPadPresale: Contract;
let baseBep20: Contract;

let signer: any = null;
let provider: any = null;

export const kingSaleInitialize = async (provider_: any, signer_: any) => {
  console.log("kingSaleInitialize");
    kingStarter = new ethers.Contract(kingStarterAddress, KingStarterContract.abi, signer_);
    kingpadFactory = new ethers.Contract(kingPadFactoryAddress, KingpadFactryContract.abi, signer_);
    baseBep20 = new ethers.Contract(KINGpassAddress, bep20ABI, signer_);

    const kingPadPresaleAddress = await kingpadFactory.getSaleAdrsFromTokenA(token_address);
    kingPadPresale = new ethers.Contract(kingPadPresaleAddress, KingpadPresaleContract.abi, signer);

    console.log("kingSaleInitialize: ", { provider, signer })
    provider = provider_;
    signer = signer_;
}

export const getKingPadPresaleTotalContribution = async () => {
  console.log("getKingPadPresaleTotalContribution");
  console.log({ kingPadPresale, signer });
  if(!isEmpty(signer)) {
    console.log("asf", { kingPadPresale })
    const tx = await kingPadPresale.totalContribution();
    console.log("totalContribution: ", {tx})
    const res = tx.toString();
    console.log("totalContribution: ", res)
    return res;
  }
}

export const kingSaleDeposit = async (currency: string, amount_: number, presaleAddress: string) => {
  const amount = ethers.utils.parseEther(amount_.toString());
  const kingPadPresaleAddress = await kingpadFactory.getSaleAdrsFromTokenA(token_address);
  console.log({ presaleAddress, kingPadPresaleAddress })
  const bnbAddress = await kingStarter.viewKingstarterCurrecy(presaleAddress);
  console.log({ bnbAddress });
  if(currency === 'BNB') {
    await kingPadPresale.deposit(0, { value: amount });
  } else {
    const tx = await baseBep20.attach(bnbAddress).approve(kingPadPresaleAddress, amount);
    await tx.wait();
    await kingPadPresale.deposit(amount, { value: 0 });
  }
}

 export const getUserContribution = async (presaleAddress: string, userAddress: string) => {
  console.log("getUserContribution");
  console.log({ kingStarter });
    if(!isEmpty(kingStarter)) {
        const starterDeposit = await kingStarter.returnPsaleUserDeposit(presaleAddress, userAddress);
        console.log({ starterDeposit })
        const userArr = await kingPadPresale.userDB(userAddress);
        console.log({ userArr });
        const presaleDeposit = userArr[4];
        let userContribution;
        if(starterDeposit > 0) {
            userContribution = starterDeposit.add(presaleDeposit);
        } else {
            userContribution = presaleDeposit;
        }
        const res = ethers.utils.formatEther(userContribution);
        console.log({ res });
        return res;
    }
 }

 export const presaleWithdraw = async () => {
    console.log("presaleWithdraw");
    // if(!isEmpty(kingPadPresale)) {
    //   const tx = await kingPadPresale.getFundBack();
    //   await tx.wait();
    // }
 }