'use client'

import { useState } from 'react'
import { Request } from './components/my-request'
import { RaiseRequisition } from './components/raise-requisition'

export default function Home() {
    const [currentPage, setCurrentPage] = useState<
        'my-requests' | 'raise-requisition'
    >('my-requests')

    return (
        <main className='p-4 bg-orange-25'>
            {currentPage === 'my-requests' ? (
                <Request
                    onRaiseRequisition={() => setCurrentPage('raise-requisition')}
                />
            ) : (
                <RaiseRequisition onBack={() => setCurrentPage('my-requests')} />
            )}
        </main>
    )
}
