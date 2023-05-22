import { useActiveClaimCondition, useContract, Web3Button } from '@thirdweb-dev/react';
import { NFT } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers';
import Image from 'next/image';
import React from 'react'
import { DRINKS_SM_ADDRESS } from '../constants/addresses';
import Loading from './Loading';


type Props = {
    nft: NFT
}

const ShopNFTCard: React.FC<Props> = ({ nft }) => {

    const { contract: drinksContract } = useContract(DRINKS_SM_ADDRESS);
    const { data: activeClaimCondition, isLoading, error } = useActiveClaimCondition(drinksContract, nft.metadata.id);

    return (
        <div className='flex flex-col items-center justify-center gap-2'>
            <Image src={nft.metadata.image!} alt='Chad photo' width={300} height={300} />
            <h2 className='text-2xl upppercase'>{nft.metadata.name}</h2>
            {!isLoading && activeClaimCondition ? (
                <p>Cost : {ethers.utils.formatEther(activeClaimCondition.price)}{'  $' + activeClaimCondition.currencyMetadata.symbol}</p>
            ) : (
                <Loading />
            )}
            <Web3Button
                contractAddress={DRINKS_SM_ADDRESS}
                action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
            >
                Buy
            </Web3Button>
        </div>
    )
}


export default ShopNFTCard