import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";



// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
     
        <Wrapper>
          <Navbar />
          <Component {...pageProps} />

        </Wrapper>

       
     



    </ThirdwebProvider>
  );
}

export default MyApp;
