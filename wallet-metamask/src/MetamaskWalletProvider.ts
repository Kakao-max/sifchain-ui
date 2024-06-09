import { Web3WalletProvider } from "@sifchain/sdk/src/clients/wallets/ethereum/Web3WalletProvider";
import { Chain, IAsset } from "@sifchain/sdk";
import { WalletProviderContext } from "@sifchain/sdk/src/clients/wallets/WalletProvider";
import { getMetamaskProvider } from "@sifchain/sdk/src/clients/wallets/ethereum/getMetamaskProvider";
import { MetaMaskInpageProvider } from "@metamask/inpage-provider";

export class MetamaskWalletProvider extends Web3WalletProvider {
  constructor(public context: WalletProviderContext) {
    super(context, {
      getWeb3Provider: () => getMetamaskProvider(),
    });
  }

  private async getMetamaskProvider(): Promise<MetaMaskInpageProvider> {
    const web3 = await this.getWeb3();
    return web3.currentProvider as MetaMaskInpageProvider;
  }

  async isInstalled(chain: Chain) {
    return !!(await this.getMetamaskProvider());
  }

  async connect(chain: Chain) {
    const provider = await this.getMetamaskProvider();

    const chainId = await provider.request({ method: "eth_chainId" });
    const [address] = await (provider.request({
      method: "eth_requestAccounts",
    }) as Promise<string>);
    return address;
  }




}
