import React, { useRef, useState } from 'react'
import { client } from '../utils/api'

export default function AddMembersForm({onSubmit}) {
    const [selectedMembers, setSelectedMembers] = useState([])
    const [searchedMembers, setSearchedMembers] = useState([])

    const searchQueryRef = useRef(null)

    function handleFormSubmit() {
        onSubmit(selectedMembers)
    }

    function searchMembers(e) {
        e.preventDefault()

        client.post('auth/list-users/', {query: searchQueryRef.current.value}).then((response) => {
            setSearchedMembers(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            <form onSubmit={searchMembers} className='flex gap-2'>
                <input ref={searchQueryRef} type="text" name="search-query" id="search-query" placeholder='Search a member' />
                <button type="submit">Go</button>
            </form>
            <div>
                {searchedMembers.map((member) => (
                    <div key={member.id}>
                        <p>{member.username}</p>
                        <button onClick={() => {setSelectedMembers([...selectedMembers, member.id])}}>Add</button>
                    </div>
                ))}
            </div>
            <button onClick={handleFormSubmit}>Done</button>
        </>
    )
}
