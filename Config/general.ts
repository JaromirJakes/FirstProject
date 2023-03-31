import KingpadFactory from '../Contracts/Json/KingpadFactory.json';
import Kingpass from "../Contracts/Json/KingPass.json"
import KingStarter from "../Contracts/Json/KingStarter.json"

const isTest = true;
const rpcUrl = isTest ? "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78" : "https://bsc-dataseed1.binance.org/"
const apiName = isTest ? "testwebhooks" : "webhooks";

const KINGpassAddress = isTest ? Kingpass.testAddress : Kingpass.address;
const kingPadFactoryAddress = isTest ? KingpadFactory.testAddress : KingpadFactory.address;
const kingStarterAddress = isTest ? KingStarter.testAddress : KingStarter.address;

const token_address = "0x5B67676a984807a212b1c59eBFc9B3568a474F0a" // test net token address

export { rpcUrl, isTest, apiName, KINGpassAddress, kingPadFactoryAddress, kingStarterAddress, token_address }
