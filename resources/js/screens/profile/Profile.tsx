import { Button } from '@/ui'
import React from 'react'

export const Profile = () => {
    return (
        <>
            <div className="bg-white">
                <h2 className="flex items-center justify-between px-2 pb-7 text-base font-semibold leading-7 text-black">
                    My Profile
                    <div className='flex gap-5'>
                        <Button
                            variant="secondary"
                            onClick={() => console.log('pepe')}
                        >
                            Review Terms & Conditions
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => console.log('pepe')}
                        >
                            Save
                        </Button>
                    </div>
                </h2>
            </div>
            <div className="bg-white shadow-lg pt-4 px-6 pb-2 border-[1px] rounded-xl">
                <div>
                    <p>bla bla example</p>
                </div>
                <hr />
                <div>
                    <p>bla bla example</p>
                </div>
                <hr />
                <div>
                    <p>bla bla example</p>
                </div>
                <hr />
                <div>
                    <p>bla bla example</p>
                </div>
                <hr />
                <div>
                    <p>bla bla example</p>
                </div>
                <hr />
                <div>
                    <p>bla bla example</p>
                </div>
                <hr />
                <div>
                    <p>bla bla example</p>
                </div>
                <hr />
                <div>
                    <p>bla bla example</p>
                </div>
                <hr />
                <div>
                    <p>bla bla example</p>
                </div>
                <hr />
                <div>
                    <p>bla bla example</p>
                </div>
                <hr />
            </div>
        </>
    )
}