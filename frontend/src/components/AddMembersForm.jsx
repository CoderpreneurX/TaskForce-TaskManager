import React, { useRef, useState } from 'react'
import { client } from '../utils/api'

export default function AddMembersForm({ onSubmit, members }) {
    const [selectedMembers, setSelectedMembers] = useState(members)
    const [searchedMembers, setSearchedMembers] = useState([])

    const searchQueryRef = useRef(null)

    function handleFormSubmit() {
        onSubmit(selectedMembers)
    }

    function addRemoveMember(memberId) {
        selectedMembers.includes(memberId) ? setSelectedMembers(
            (prevList) => prevList.filter((i) => i !== memberId)
        ) : setSelectedMembers([...selectedMembers, memberId])
    }

    function searchMembers(e) {
        e.preventDefault()

        client.post('auth/list-users/', { query: searchQueryRef.current.value }).then((response) => {
            setSearchedMembers(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className='p-4 rounded grid gap-2 grid-rows-8 bg-secondary border-2 border-b-4 border-black'>
            <form onSubmit={searchMembers} className='flex bg-secondary rounded gap-2'>
                <input required minLength={5} className='px-4 py-2 border-2 border-b-4 rounded border-black' ref={searchQueryRef} type="text" name="search-query" id="search-query" placeholder='Search a member' />
                <button className='btn-primary' type="submit">Go</button>
            </form>
            <div className='row-span-6'>
                {searchedMembers.map((member) => (
                    <div className='flex gap-2 mb-2 rounded border-black border-2 border-b-4 p-2 items-center' key={member.id}>
                        <div className='flex-1 font-bold'>
                            <h3 className='text-lg'>{member.first_name} {member.last_name}</h3>
                            <p className='flex-1 font-bold'>@{member.username}</p>
                        </div>
                        <button className='btn-primary' onClick={() => { addRemoveMember(member.id) }}>
                            {selectedMembers.includes(member.id) ? 'Remove' : 'Add'}
                        </button>
                    </div>
                ))}
            </div>
            <button className='btn-primary' onClick={handleFormSubmit}>Done</button>
        </div>
    )
}
