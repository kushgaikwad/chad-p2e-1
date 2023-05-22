import { useContract, useNFTs } from '@thirdweb-dev/react';
import React from 'react'
import Loading from '../components/Loading';
import ShopNFTCard from '../components/ShopNFTCard';
import { DRINKS_SM_ADDRESS } from '../constants/addresses';

type Props = {}

const Shop = (props: Props) => {


    const { contract: drinksContract } = useContract(DRINKS_SM_ADDRESS);

    const { data: nfts } = useNFTs(drinksContract);

    return (
        <div>
            <h1 className='py-10 text-4xl '>Purchase Drinks with $YES to stake and earn more $YES</h1>
            <div className='flex justify-center gap-10 py-10'>
                {!nfts ? <Loading /> : <>
                    {nfts.map((nftitem) => <ShopNFTCard key={nftitem.metadata.id} nft={nftitem} />)}
                </>}
            </div>

        </div>
    )
}

export default Shop