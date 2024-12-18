import Button from '@/app/components/Button'
import { ServerCrash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Error | Viet Motor Parts'
}

export default function Page() {
    return (
        <div className='flex flex-col gap-5 mx-auto items-center justify-center  h-screen'>
            <ServerCrash size={125} />
            <h1 className='text-4xl font-bold ml-4'>Server Error</h1>
            <Button link='/' title='Home' />
        </div>
    )
}