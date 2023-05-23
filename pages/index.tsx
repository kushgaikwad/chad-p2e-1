
import { ConnectWallet, useAddress, useContract, useContractRead, useOwnedNFTs, useTokenBalance } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import ClaimChad from "../components/ClaimChad";
import Loading from "../components/Loading";
import { CHAD_DEV_SM_ADDRESS, DRINKS_SM_ADDRESS, DRINK_STAKE_SM_ADDRESS, YES_REWARDS_SM_ADDRESS } from "../constants/addresses";
import Image from 'next/image';
import { BigNumber, ethers } from "ethers";
import YourDrinks from "../components/YourDrinks";
import StakeGame from "../components/StakeGame";

const Home: NextPage = () => {

  const userAddress = useAddress();

  const { contract: chadDevContract } = useContract(CHAD_DEV_SM_ADDRESS);
  const { contract: drinksContract } = useContract(DRINKS_SM_ADDRESS);
  const { contract: drinkStakeContract } = useContract(DRINK_STAKE_SM_ADDRESS);
  const { contract: yesRewardsContract } = useContract(YES_REWARDS_SM_ADDRESS);

  const { data: ownedChadNFT, isLoading: ownedChadNFTLoading, error: ownedChadNFTError } = useOwnedNFTs(chadDevContract, userAddress);
  const { data: ownedDrinkNFTs, isLoading: ownedDrinkNFTsLoading, error: ownedDrinkNFTsError } = useOwnedNFTs(drinksContract, userAddress);
  const { data: stakeData, isLoading: stakeDataLoading } = useContractRead(drinkStakeContract, "getStakeInfo", [userAddress]);
  const { data: yesBalance, isLoading: yesBalanceLoading, error: yesBalanceError } = useTokenBalance(yesRewardsContract, userAddress);


  if (!userAddress) {
    return <div className="flex flex-col items-center justify-center h-screen gap-10 ">
      <h1 className="font-bold text-7xl">Welcome to Chad p2e</h1>
      <ConnectWallet />
    </div>
  }

  if (ownedChadNFTLoading) {
    return <Loading />
  }

  if (ownedChadNFT?.length === 0) {
    return <ClaimChad />
  }

  return (
    <>
      <div className="flex items-center py-4 justify-evenly">
        <div>
          <h2 className="text-3xl font-bold">Your Chad:</h2>
          {ownedChadNFT?.map((nft) => (
            <div key={nft.metadata.id}>
              <Image className="py-3" src={nft.metadata.image!} alt='Chad' width={150} height={150} />
            </div>
          ))}

          <p>Your $YES balance: </p>
          {yesBalance && <p className="text-lg font-bold">{ethers.utils.formatUnits(yesBalance.value, 18).slice(0,8)}</p>}
        </div>
        <div >
          <h2 className="text-3xl font-bold">Your available drinks:</h2>

          <YourDrinks nft={ownedDrinkNFTs} />
        </div>

      </div>



      <h2 className="py-4 mt-5 text-3xl ">Stake Game:</h2>
      <div className="flex items-center justify-center gap-10">

        {
          stakeData && stakeData[0].length !== 0 ? (stakeData[0].map((nft: BigNumber) => (
            <StakeGame
              key={nft.toNumber()}
              tokenId={nft.toNumber()}
            />
          ))) : (<p className="py-5 text-md">..Stake your drinks to earn $YES..</p>)
        }
      </div>
    </>
  );
};

export default Home;

