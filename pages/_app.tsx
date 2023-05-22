import type { AppProps } from "next/app";
import { coinbaseWallet, localWallet, metamaskWallet, smartWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";
import { SMART_WALLET_FACTORY_SM_ADDRESS } from "../constants/addresses";



// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {

  const API_KEY = process.env.THIRDWEB_API_KEY;
  return (
    <ThirdwebProvider activeChain={activeChain} supportedWallets={[
      smartWallet({
        factoryAddress: SMART_WALLET_FACTORY_SM_ADDRESS,
        thirdwebApiKey: API_KEY!,
        gasless: true,
        personalWallets: [
          metamaskWallet(),
          localWallet({persist:true}),
          coinbaseWallet(),
        ]
      })
    ]}>
     
        <Wrapper>
          <Navbar />
          <Component {...pageProps} />

        </Wrapper>

       
     



    </ThirdwebProvider>
  );
}

export default MyApp;
