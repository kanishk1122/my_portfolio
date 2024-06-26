import { useState } from 'react'
import allprojectdata from '../assets/allprojectdata.json'
import '../css/project.css'
import video from '../../public/videos/kepapro.mp4'
import Loader from './Loader'
const Projects = () => {

  const [hoveredProject, setHoveredProject] = useState(null);
  const [loadeing, setloadeing] = useState(true)

  
  

  return (
    <div className="w-full h-fit  flex flex-col justify-start py-6 pt-14 px-2 items-center  min-h-screen ">
            {/* <div className=' py-16 gap-14 w-full flex flex-wrap  justify-center items-center h-fit min-h-[30vh] '>

            <div className=' w-[45%] flex flex-col justify-center items-center h-fit text-center'>
              <div className='bg-red-500 w-[40%] h-[20vh] border-4 rounded-3xl border-white  object-cover '></div>
            <h2

             className=" text-5xl font-light font-['monument'] px-3 py-2">kepapro</h2>
            <p className="text-3xl  ">Kepapro is your ultimate destination for streaming the latest anime episodes. Stay updated with new releases and explore our vast anime library.</p>
            </div>
            <div className=' w-[30vw] h-[40vh] min-w-[250px]  max-md:-ml-12 min-h-[50px] max-md:max-h-[180px] max-md:max-w-[280px] relative flex justify-center  items-end text-center'>
            <img src="https://i.imgur.com/xsfEIHn.png" className='w-[full] border-4  max-md:rounded-2xl rounded-3xl border-white object-cover h-full' alt="" />
            <img src="https://i.imgur.com/sW2h3d5.png" className='w-[25%] min-w-[90px] max-md:rounded-2xl absolute left-[120%] -translate-x-[120%] border-4 rounded-3xl border-white  object-cover h-4/4 '  alt="" />
            </div>
            </div> */}
            {allprojectdata.map((item, index) => (
        <div
          key={index}
          className='py-16 gap-14 w-full flex flex-wrap  relative justify-center items-center h-fit min-h-[30vh]'
          
        >
          <div
          onMouseEnter={() => setHoveredProject(index)}
          onMouseLeave={() => setHoveredProject(null)}
          onClick={() => setHoveredProject(index)}
          onDoubleClick={() => setHoveredProject(null)}
           className='w-[45%] flex flex-col min-w-[300px] justify-center items-center h-fit text-center max-md:w-full '>
            <div
              className='videoplayer  w-[20%] min-w-[250px] absolute h-[23vh] -top-[9vh] overflow-hidden border-4 rounded-3xl border-white object-cover'
              style={{ display: hoveredProject === index ? 'block' : 'none' }}
            >
              <video  src={item.video_link} autoPlay loop muted className='w-full bg-transparent  h-full object-cover ' >
             
              </video>
            </div>
            <div className='flex justify-center items-center gap-3'>
            <h2 className="text-5xl project-name font-['monument']">
              {item.project_name}
            </h2>
           {item.video_link !== "" &&
           <a href={item.project_link} 
           target='_blank' 
           className='w-fit h-full '>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-[50px] h-[50px]' fill="currentColor"><path d="M18.3638 15.5355L16.9496 14.1213L18.3638 12.7071C20.3164 10.7545 20.3164 7.58866 18.3638 5.63604C16.4112 3.68341 13.2453 3.68341 11.2927 5.63604L9.87849 7.05025L8.46428 5.63604L9.87849 4.22182C12.6122 1.48815 17.0443 1.48815 19.778 4.22182C22.5117 6.95549 22.5117 11.3876 19.778 14.1213L18.3638 15.5355ZM15.5353 18.364L14.1211 19.7782C11.3875 22.5118 6.95531 22.5118 4.22164 19.7782C1.48797 17.0445 1.48797 12.6123 4.22164 9.87868L5.63585 8.46446L7.05007 9.87868L5.63585 11.2929C3.68323 13.2455 3.68323 16.4113 5.63585 18.364C7.58847 20.3166 10.7543 20.3166 12.7069 18.364L14.1211 16.9497L15.5353 18.364ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"></path></svg>
           </a>}
            </div>
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