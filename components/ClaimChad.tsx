import { useContract, useContractMetadata, Web3Button } from '@thirdweb-dev/react'
import React from 'react'
import { CHAD_DEV_SM_ADDRESS } from '../constants/addresses';
import Image from 'next/image';

type Props = {}

const ClaimChad = (props: Props) => {

    const { contract: chadDevContract } = useContract(CHAD_DEV_SM_ADDRESS);
    const { data: contractMetadata, isLoading } = useContractMetadata(chadDevContract);

  return (
    <div>
        <h1 className='py-10 text-4xl font-bold'>Claim a Chad for free to start earning $YES tokens</h1>
        <div className='flex items-center gap-8 py-8 justify-evenly'>
        <Image  src={contractMetadata?.image} alt='Chad photo' width={300} height={300}/>
        <Web3Button contractAddress={CHAD_DEV_SM_ADDRESS}
        action={(contract) => contract.erc1155.claim(0, 1)} >Claim a Chad</Web3Button>

        </div>
        

    </div>
  )
}

export default ClaimChad