import { useAddress, useContract, useNFTs, useTokenBalance } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import React from 'react'
import Loading from '../components/Loading';
import ShopNFTCard from '../components/ShopNFTCard';
import { DRINKS_SM_ADDRESS, YES_REWARDS_SM_ADDRESS } from '../constants/addresses';

type Props = {}

const Shop = (props: Props) => {

    const userAddress = useAddress();
    const { contract: drinksContract } = useContract(DRINKS_SM_ADDRESS);
    const { contract: yesRewardsContract } = useContract(YES_REWARDS_SM_ADDRESS);

    const { data: yesBalance, isLoading: yesBalanceLoading, error: yesBalanceError } = useTokenBalance(yesRewardsContract, userAddress);

    const { data: nfts } = useNFTs(drinksContract);

    return (
        <div>
            <h1 className='py-10 text-4xl '>Purchase Drinks with $YES to stake and earn more $YES</h1>
            <div className='flex items-center gap-1 text-2xl uppercase'>
            <h2 className='py-5 '>Your $YES balance: </h2>
            {yesBalance ? <p className="font-bold ">{ethers.utils.formatUnits(yesBalance.value, 18).slice(0, 8)}</p> : <p className='font-bold'>!Connect wallet!</p>}


            </div>
           
            <ul className='text-lg text-gray-300 '>
                <li>Stakking a Juice will reward you 1 $YES per minute</li>
                <li>Stakking a Smoothie will reward you 2 $YES per minute</li>
                <li>Stakking a Cocktail will reward you 3 $YES per minute</li>
            </ul>

            <div className='flex justify-center gap-10 py-10'>
                {!nfts ? <Loading /> : <>
                    {nfts.map((nftitem) => <ShopNFTCard key={nftitem.metadata.id} nft={nftitem} />)}
                </>}
            </div>

        </div >
    )
}

export default Shop