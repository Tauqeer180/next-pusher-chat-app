import React from 'react'
import Button from './button'

export function InfoCard({ data }) {
    return (
        <div className='flex flex-col md:h-[545px] md:pb-0 pb-10 h-auto text-center lg:px-8 px-1' >
            <h1 className='sm:pb-8 pb-2 md:pt-20 sm:pt-16 pt-4 text-4xl uppercase tracking-wider' > {data?.heading} </h1>
            <p className='md:pb-16 pb-10 text-base font-light ' >

                {data?.text}
            </p>
            <div>

                <Button href={data?.link} > More Info </Button>
            </div>
        </div>
    )
}
