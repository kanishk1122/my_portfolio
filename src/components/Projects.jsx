import { useState } from 'react'
import '../css/project.css'
const Projects = () => {

  const [hoveredProject, setHoveredProject] = useState(null);

 const allprojectdata =  [
    {
      "id":1,
      "project_name": "kepapro",
      "project_description": "Kepapro is your ultimate destination for streaming the latest anime episodes. Stay updated with new releases and explore our vast anime library.",
      "photo_links": [
        "https://i.imgur.com/xsfEIHn.png",
        "https://i.imgur.com/sW2h3d5.png"
      ],
      "project_link":"https://kepapro.vercel.app/",
      "video_link": "src/assets/videos/kepapro.mp4",
      "project_Category":"fullstack"
    },
    {
      "id":2,
      "project_name": "Music school",
      "project_description": "This is a description of Project Beta, focused on creating a mobile application for fitness tracking.",
      "photo_links": [
        "https://i.imgur.com/MRfmQRD.png",
        "https://i.imgur.com/v1y80ua.png"
      ],
      "project_link":"https://music-school-front-end.vercel.app/",
      "video_link": "/src/assets/videos/musicschool.mp4",
      "project_Category":"frontend"
    },
    {
      "id":3,
      "project_name": "pinterest clone ",
      "project_description": "This is my Pinterest-inspired project, utilizing MongoDB as the database management system. Users can register, log in, create pins, and even update their profile picture.",
      "photo_links": [
        "https://i.imgur.com/2OZxgJm.png",
        "https://i.imgur.com/DZg9iZp.png"
      ],
      "project_link":"https://printrest.onrender.com/",
      "video_link": "/src/assets/videos/printerst.mp4",
      "project_Category":"fullstack"
    },
    {
      "id":4,
      "project_name": "Magma",
      "project_description": "This is project base on modern scrolling animation which you also see at apple's web pages .they are amazing at first I see the animation i was shocking but this type of animtion only work at desktops  ",
      "photo_links": [
        "https://i.imgur.com/bA7P2RL.png",
        "https://i.imgur.com/yYqA2gV.png"
      ],
      "project_link":"https://music-school-front-end.vercel.app/",
      "video_link": "/src/assets/videos/magma.mp4",
      "project_Category":"frontend"
    }
  
  ]

  

  return (
    <div className="w-full h-fit  flex flex-col justify-start py-6 pt-14 px-2 items-center  min-h-screen ">
            {allprojectdata.map((item, index) => (
        <div
          key={index}
          className='py-16 gap-14 w-full flex flex-wrap relative justify-center items-center h-fit min-h-[30vh]'
          
        >
          <div
          onMouseEnter={() => setHoveredProject(index)}
          onMouseLeave={() => setHoveredProject(null)}
           className='w-[45%] flex flex-col justify-center items-center h-fit text-center max-md:w-full '>
            <div
              className='videoplayer  w-[20%] absolute h-[23vh] -top-[9vh] overflow-hidden border-4 rounded-3xl border-white object-cover'
              style={{ display: hoveredProject === index ? 'block' : 'none' }}
            >
              <video src={item.video_link} autoPlay loop muted className='w-full bg-red-500  h-full object-cover ' >
             
              </video>
            </div>
            <h2 className="text-5xl project-name font-['monument']">
              {item.project_name}
            </h2>
            <p className="text-3xl max-md:text-xl">{item.project_description}.</p>
          </div>
          <div className='w-[30vw] h-[40vh] min-w-[250px] max-md:-ml-12 min-h-[50px] max-md:max-h-[180px] max-md:max-w-[280px] relative flex justify-center items-end text-center'>
            <img
              src={item.photo_links[0]}
              className='w-[full] border-4 max-md:rounded-2xl rounded-3xl border-white object-cover h-full'
              alt=""
            />
            <img
              src={item.photo_links[1]}
              className='w-[25%] min-w-[90px] max-md:rounded-2xl absolute left-[120%] -translate-x-[120%] border-4 rounded-3xl border-white object-cover h-4/4'
              alt=""
            />
          </div>
        </div>
      ))}
    
          </div>
  )
}

export default Projects