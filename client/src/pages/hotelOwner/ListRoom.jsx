import React, {useState} from 'react'
import Title from '../../components/Title'
import {roomsDummyData} from '../../assets/assets'

const ListRoom = () => {
    const [rooms, setRooms] = useState(roomsDummyData)

    return (
        <div className='p-4'>
            <Title
                align='left'
                font='outfit'
                title='Room Listings'
                subTitle='View, edit, or manage all listed rooms. Keep the information
                up-to-date to provide the best experience'
            />

            <p className='text-gray-500 mt-8 mb-4'>All Rooms</p>

            <div className='w-full max-w-3xl border border-gray-300 rounded-lg
            max-h-[500px] overflow-y-auto shadow-sm'>
                <table className='w-full'>
                    <thead className='bg-gray-50 sticky top-0'>
                    <tr>
                        <th className='py-3 px-4 text-left text-gray-800 font-medium'>Name</th>
                        <th className='py-3 px-4 text-left text-gray-800 font-medium max-sm:hidden'>Facility</th>
                        <th className='py-3 px-4 text-left text-gray-800 font-medium'>Price / night</th>
                        <th className='py-3 px-4 text-center text-gray-800 font-medium'>Status</th>
                    </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-300'>
                    {rooms.map((item) => (
                        <tr key={item.id} className='hover:bg-gray-50'>
                            <td className='py-4 px-4 text-gray-700'>{item.roomType}</td>
                            <td className='py-4 px-4 text-gray-700 max-sm:hidden'>
                                {item.amenities?.join(', ') || '-'}
                            </td>
                            <td className='py-4 px-4 text-gray-700'>${item.pricePerNight}</td>
                            <td className='py-4 px-4 flex justify-center'>
                                <label className='relative inline-flex items-center cursor-pointer'>
                                    <input
                                        type="checkbox"
                                        className='sr-only peer'
                                        checked={item.isAvailable}
                                        onChange={() => {/* Tambahkan handler jika perlu */}}
                                    />
                                    <div className='w-12 h-7 bg-gray-300 rounded-full peer peer-checked:bg-blue-500'></div>
                                    <span className='absolute left-1 top-1 w-5 h-5 bg-white rounded-full
                                        transition-all duration-200 peer-checked:translate-x-5'></span>
                                </label>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListRoom