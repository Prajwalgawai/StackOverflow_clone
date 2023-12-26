import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';

const ProfileBio = ({currentProfile}) => {

  let theme=useSelector((state)=>state.fetchWeather);
// theme="light";
theme=theme?.data

  return (
    <div className={`${theme!=="dark"?'profile':'profile-dark'}`}>
      <div>
       <div className={`${theme!=="dark"?'tags-watched':'tags-watched-dark'}`}>
        {
      currentProfile?.tags.length!==0?(
        <>
        <h4>Tags watched</h4>
        {
            currentProfile?.tags.map((tag)=>(
                <p key={tag}>{tag}</p>
            ))
            }
            </>
      ):(
        <p>0 tags watched</p>
      )
}
</div>
</div>

<div>
<div className={`${theme!=="dark"?'about-profile':'about-profile-dark'}`}>
    {
      currentProfile?.about?(
<>
<h4>About</h4>
<p>{currentProfile?.about}</p>
</>
      ):(
        <p>No bio found</p>
      )  
    }
    </div>
    </div>

    </div>
  )
}

export default ProfileBio
