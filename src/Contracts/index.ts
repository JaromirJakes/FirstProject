/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Contract, ethers } from 'ethers';
import { isEmpty } from 'src/Utils/validator';
import { apiName, kingPadFactoryAddress, KINGpassAddress } from 'src/Config/general';
import axios from 'axios';
import KingPassContract from './Json/KingPass.json';
import KingPadFactoryContract from "./Json/KingpadFactory.json"

import { projectSettingProps, tokenDataProps } from 'src/Constant/interface';

let signer: any = null;
let provider: any = null;
let KINGpass: Contract;
let kingPadFactory: Contract;

export const initializeWeb3 = async (provider_: any, signer_: any) => {
  console.log("initializeWeb3");
  KINGpass = new ethers.Contract(KINGpassAddress, KingPassContract.abi, provider_);

  kingPadFactory = new ethers.Contract(kingPadFactoryAddress, KingPadFactoryContract.abi, signer_);

  provider = provider_;
  signer = signer_;
};

export const signMessage = async () => {
  console.log({ signer })
  if (!isEmpty(signer)) {
    const address = await signer?.getAddress();
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const res = await axios.get(`https://${apiName}.kingpad.finance/get_auth_message?signer_address=${address}`);
    const message = res.data.message;
    const signMessage = await signer?.signMessage(message);
    console.log({ address, message, signer, signMessage });
  }
}

export const getTotalSupply = async () => {
  if (!isEmpty(KINGpass)) {
    // signMessage();
    console.log("KINGpass: ", KINGpass);
    const totalSupply = await KINGpass.totalSupply();
    console.log("totalSupply: ", totalSupply.toString());
    return totalSupply;
  } else {
    return "--"
  }
}

export const getProjectDetails = async (address: string) => {
  const response = await axios.get(`https://${apiName}.kingpad.finance/get_project_by_owner?owner=${address}`)
  const projectId = response.data.id;
  console.log("getProjectDetails: ", projectId, response.data)
  if (projectId !== undefined || response.data.error) {
    const res = await axios.get(`https://${apiName}.kingpad.finance/project_details?id=2`);
    const data = res.data;
    return data;
  }
}
export const getProjectDetailsById = async (id: number) => {
  const res = await axios.get(`https://${apiName}.kingpad.finance/project_details?id=${id}`);
  const data = res.data;
  console.log("getProjectDetailsById: ", {data});
  return data;
}

export const getBadgeNames = async () => {
  let names;

  interface Badge {
    name: string;
  }

  interface KingPadResponse {
    KingPad: {
      badges: {
        [key: number]: Badge;
      };
    }
  }
  await axios.get<KingPadResponse>(`https://${apiName}.kingpad.finance/mainConfig?app_id=1`).then(response => {
    const badges = response.data?.KingPad.badges;
    if (badges) {
      names = Object.values(badges).map(badge => badge.name);
    }
  }).catch(err => {
    console.error(err)
  });

  return names;
}

export const getCreatePresaleData = async () => {
  const response = await axios.get(`https://${apiName}.kingpad.finance/create_presale_data?id=1`);
  const res = response.data;
  console.log({ res })
  return res;
}

export const getUserPassActive = async (userAddress: string) => {
  if (!isEmpty(provider)) {
    const tx = await KINGpass.checkIfPassActive(userAddress);
    console.log({ tx });
    return tx;
  }
}

export const getProjectSetting = async () => {
  const response = await axios.get(`https://${apiName}.kingpad.finance/project_settings?id=1`);
  const res: projectSettingProps = response.data;
  const projectSetting: tokenDataProps[] = [
    {
      id: `${res.redistribution[0].name}`,
      label: `${res.redistribution[0].name} ${res.redistribution[0].value}`,
      value: parseFloat(res.redistribution[0].value),
      color: '#8462F6'
    },
    {
      id: `${res.redistribution[1].name}`,
      label: `${res.redistribution[1].name} ${res.redistribution[1].value}`,
      value: parseFloat(res.redistribution[1].value),
      color: '#C6B8F4'
    },
    {
      id: `${res.redistribution[2].name}`,
      label: `${res.redistribution[2].name} ${res.redistribution[2].value}`,
      value: parseFloat(res.redistribution[2].value),
      color: '#412C88'
    },
    {
      id: `${res.redistribution[3].name}`,
      label: `${res.redistribution[3].name} ${res.redistribution[3].value}`,
      value: parseFloat(res.redistribution[3].value),
      color: '#6038e0'
    }
  ]
  return projectSetting;
}