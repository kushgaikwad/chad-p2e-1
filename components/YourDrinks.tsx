import { useAddress, useContract } from '@thirdweb-dev/react'
import { NFT } from '@thirdweb-dev/sdk'
import Link from 'next/link'
import React from 'react'
import { DRINKS_SM_ADDRESS, DRINK_STAKE_SM_ADDRESS } from '../constants/addresses'

import YourNFTCard from './YourNFTCard'

type Props = {
    nft: NFT[] | undefined,
}

const YourDrinks: React.FC<Props> = ({ nft }) => {
  
    if (nft?.length === 0) {
        return (
            <div>
                <h3 className='py-5 text-lg'>You dont have any drinks currently. Buy drinks to be able to stake them</h3>

                <Link href='/shop'>
                    <button type="button" className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-gray-500 border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800">
                        Shop Now
                    </button>
                </Link>

            </div>
        )
    }

    return (
        <>
            <div className='flex gap-7'> 
                 {nft?.map((nft) => (
                <YourNFTCard nft={nft} key={nft.metadata.id} />
            ))}</div>

        </>

    )
}

export default YourDrinks