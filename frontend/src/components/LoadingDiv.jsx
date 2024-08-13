import React from 'react'

export default function LoadingDiv() {
    return (
        <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-l-black p-2"></div>
            <p className="font-medium text-lg">Loading...</p>
        </div>
    )
}
