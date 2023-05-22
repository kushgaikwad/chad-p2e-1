import { useAddress, useContract, useContractRead, useNFT, Web3Button } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import Image from 'next/image';
import React from 'react'
import { DRINKS_SM_ADDRESS, DRINK_STAKE_SM_ADDRESS } from '../constants/addresses';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    tokenId: number,
}

const StakeGame: React.FC<Props> = ({ tokenId }) => {

    const userAddress = useAddress();
    const { contract: drinksContract } = useContract(DRINKS_SM_ADDRESS);
    const { contract: drinkStakeContract } = useContract(DRINK_STAKE_SM_ADDRESS);

    const { data: nft } = useNFT(drinksContract, tokenId);
    const { data: claimableRewards } = useContractRead(drinkStakeContract, 'getStakeInfoForToken', [tokenId, userAddress]);
    const notifyUnstake = () => alert(`Successfully unstaked ${nft ? nft.metadata.name : ''}!`);
    const notifyClaimed = () => alert('Successfully claimed $YES');

    return (
        <div>

            {nft && (
                <div className='flex flex-col items-center justify-center gap-4'>
                    <Image src={nft.metadata.image!} alt='nft' width={150} height={150} />
                    <p className='text-2xl'>{nft.metadata.name}</p>
                    <p>you have staked: {ethers.utils.formatUnits(claimableRewards[0], 0)} {nft.metadata.name}</p>
                    <Web3Button
                        contractAddress={DRINK_STAKE_SM_ADDRESS}
                        action={(contract) => contract.call('withdraw', [tokenId, 1])}
                        onSuccess={notifyUnstake}
                        onError={(error) => alert("Something went wrong!")}
                    >Unstake</Web3Button>
                    <p className='text-xl font-bold'>Claimable $YES: {ethers.utils.formatUnits(claimableRewards[1], 18).slice(0, 4)}</p>
                    <Web3Button
                        contractAddress={DRINK_STAKE_SM_ADDRESS}
                        action={(contract) => contract.call('claimRewards', [tokenId])}
                        onSuccess={notifyClaimed}
                        onError={(error) => alert("Something went wrong!")}
                    >Claim $YES</Web3Button>
                    

                </div>
            )}

        </div>
    )
}

export default StakeGame