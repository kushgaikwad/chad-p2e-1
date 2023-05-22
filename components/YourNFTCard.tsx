import React from 'react'
import Image from 'next/image';
import { NFT } from '@thirdweb-dev/sdk';
import { useAddress, useContract, Web3Button } from '@thirdweb-dev/react';
import { DRINKS_SM_ADDRESS, DRINK_STAKE_SM_ADDRESS } from '../constants/addresses';

type Props = {
    nft: NFT
}

const NFTCard: React.FC<Props> = ({ nft }) => {


    const userAddress = useAddress();
    const { contract: drinksContract } = useContract(DRINKS_SM_ADDRESS);
    const { contract: drinkStakeContract } = useContract(DRINK_STAKE_SM_ADDRESS);

    const stakeNFT = async (id: string) => {
        if (!userAddress) {
            return;
        }

        const isApproved = await drinksContract?.erc1155.isApproved(userAddress, DRINK_STAKE_SM_ADDRESS)

        if (!isApproved) {
            await drinksContract?.erc1155.setApprovalForAll(DRINK_STAKE_SM_ADDRESS, true);
        }

        await drinkStakeContract?.call('stake', [id, 1]);

    }
    return (
        <div className="flex flex-col items-center max-w-sm overflow-hidden rounded shadow-lg">
            <div className="pt-3 ">
            <Image  src={nft.metadata.image!} alt='NFT' width={150} height={150} />
            </div>
           
            <div className="py-3 mb-1 text-xl font-bold">{nft.metadata.name} : {nft.quantityOwned}</div>
            <Web3Button contractAddress={DRINK_STAKE_SM_ADDRESS}
                action={() => stakeNFT(nft.metadata.id)}>
                Stake
            </Web3Button>


        </div>
    )
}

export default NFTCard