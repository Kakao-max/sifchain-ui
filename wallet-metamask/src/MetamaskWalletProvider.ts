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





}
