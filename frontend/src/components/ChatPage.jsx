import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';


const ChatPage = () => {
    const {user,suggestedUsers,selectedUser} = useSelector(store => store.auth);
    const isOnline = true;
    const dispatch = useDispatch();

  return (
    <div className='flex ml-[16%] h-screen'>
<section>
    <h1 className='font-bold mb-4 text-xl'>{user?.username}</h1>
    <hr className='mb-4 border-gray-300'/>
    <div className='overflow-y-auto h-[80vh]'>
{
    suggestedUsers.map((suggestedUser) => {
        return (
            <div onClick={()=>dispatch(setSelectedUser(suggestedUser))} className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
                <Avatar>
                    <AvatarImage src={suggestedUser?.profilePicture}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              <div className='flex flex-col'>
                <span className='font-medium '>
                    {suggestedUser?.username}
                </span>
                <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {
                    isOnline ? 'online' : 'offline'
                  } 
                </span>
               
                </div>
                </div>

        )
    })
}
    </div>
</section>
{
    selectedUser ? (

        <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
<div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>


<Avatar>
    <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
<AvatarFallback>CN</AvatarFallback>
</Avatar>
<div className='flex flex-col'>
    <span>{selectedUser?.username}</span>
</div>
</div>
msg
<div>
    <Input type="text" className="flex-1 mr-2 focus-visible:ring-transparent" placeholder="Message..."/>
    
</div>
        </section>

    ) : (
<section>


</section>
    )
}
    </div>
  )
}

export default ChatPage