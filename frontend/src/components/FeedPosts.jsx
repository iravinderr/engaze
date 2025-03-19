import React from 'react'

const FeedPosts = ({postData}) => {
  return (
    <div className='w-full'>
        <p>{postData.author.name}</p>
        
    </div>
  )
}

export default FeedPosts