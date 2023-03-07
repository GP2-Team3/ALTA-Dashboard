import React from 'react'
import { FaUserFriends } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { SiGoogleclassroom } from 'react-icons/si';
import { VscFeedback } from 'react-icons/vsc';


const CardDashboard = () => {
    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 mb-10'>
            <div className="card w-[400px]  shadow-xl mt-15 mx-auto bg-zinc-300 h-64">
                <div className="card-body  gap-14">
                    <p className='flex text-2xl text-dark-alta'>
                        <FaUserFriends className='mr-4 mt-1 text-dark-alta' />
                        Mentee Active
                    </p>
                    <h2 className='flex p-3 text-2xl text-dark-alta'>
                        <FiUser className=' mr-3 text-dark-alta' />
                        100 Mente
                    </h2>
                </div>
            </div>
            <div className="card w-[400px]  shadow-xl mt-15 mx-auto bg-zinc-300 h-64">
                <div className="card-body ">
                    <p className='flex text-2xl text-dark-alta'>
                        <SiGoogleclassroom className='mr-4 mt-1 text-dark-alta' />
                        Mentee Placement
                    </p>
                    <h2 className='flex p-3 text-2xl text-dark-alta'>
                        <FiUser className=' mr-3 text-dark-alta' />
                        100 Mentee
                    </h2>
                </div>
            </div>
            <div className="card w-[400px]  shadow-xl mt-15 mx-auto bg-zinc-300 h-64">
                <div className="card-body ">
                    <p className='flex text-2xl text-dark-alta'>
                        <VscFeedback className='mr-4 mt-1 text-dark-alta' />
                        Mentee Feedback
                    </p>
                    <h2 className='flex p-3 text-2xl text-dark-alta'>
                        <FiUser className=' mr-3 text-dark-alta' />
                        100 Feedback
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default CardDashboard