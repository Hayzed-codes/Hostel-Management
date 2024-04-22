import React from 'react'

const Sidebar = () => {
    const dashboardLinks = [
        { title: "Students", url: "/studentdash" },
        { title: "Rooms", url: "/room" },
        { title: "RoomType", url: "/room-type" },
        { title: "Reports", url: "/report" },
      ];

// const Sidebar = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleLinkClick = (index) => {
//     setActiveIndex(index);
//   };
// }
    
  return (
    
    <div className='--flex-start'>
      <div className="left">
        {dashboardLinks.map(({title, url}, i) => (
            
        ))}
      </div>
    </div>
  )
}

export default Sidebar
