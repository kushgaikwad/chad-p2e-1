import { ConnectWallet } from '@thirdweb-dev/react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <div className='flex flex-row items-center justify-between py-4'>
            <span className='text-4xl font-extrabold'>Chad p2e</span>
            <div className=''>
                <Link className='mx-5 hover:underline' href="/">Play</Link>
                <Link className='mx-5 hover:underline' href="/shop">Shop</Link>
            </div>
            <ConnectWallet />
        </div>
    )
}

export default Navbar