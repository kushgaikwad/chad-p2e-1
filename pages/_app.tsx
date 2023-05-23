import type { AppProps } from "next/app";
import { coinbaseWallet, localWallet, metamaskWallet, smartWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";
import { SMART_WALLET_FACTORY_SM_ADDRESS } from "../constants/addresses";
import { Mumbai } from "@thirdweb-dev/chains";
import { Crimson_Pro } from 'next/font/google';

const crimsonPro = Crimson_Pro({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThirdwebProvider activeChain={Mumbai} supportedWallets={[
      smartWallet({
        factoryAddress: SMART_WALLET_FACTORY_SM_ADDRESS,
        thirdwebApiKey: process.env.THIRDWEB_API_KEY as string,
        gasless: true,
        personalWallets: [
          metamaskWallet(),
          // localWallet({persist: true}), // persisits the user
          localWallet(),
          coinbaseWallet(),
        ]
      })
    ]}>
      <Wrapper className={crimsonPro.className}>
        <Navbar />
        <Component {...pageProps} />
      </Wrapper>
    </ThirdwebProvider>
  );
}

export default MyApp;
