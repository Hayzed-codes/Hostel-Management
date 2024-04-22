import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const Sidebar = () => {
      const [activeIndex, setActiveIndex] = useState(0);
    
      const handleLinkClick = (index) => {
        setActiveIndex(index);
      };
    }
    
    const dashboardLinks = [
        { title: "Students", url: "/studentdash" },
        { title: "Rooms", url: "/room" },
        { title: "RoomType", url: "/room-type" },
        { title: "Reports", url: "/report" },
      ];

    
  return (
    
    <div className='--flex-start'>
      <div className="left">
        {dashboardLinks.map(({title, url}, i) => (
            <div  className='--flex-center --dir-column' key={i}>
                <Link to={url}>
                    {title}
                </Link>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
