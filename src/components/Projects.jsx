import { useState } from 'react'
import allprojectdata from '../assets/allprojectdata.json'
import '../css/project.css'
const Projects = () => {

  const [hoveredProject, setHoveredProject] = useState(null);

  
  

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
          className='py-16 gap-14 w-full flex flex-wrap relative justify-center items-center h-fit min-h-[30vh]'
          
        >
          <div
          onMouseEnter={() => setHoveredProject(index)}
          onMouseLeave={() => setHoveredProject(null)}
           className='w-[45%] flex flex-col justify-center items-center h-fit text-center max-md:w-full '>
            <div
              className='videoplayer  w-[20%] absolute h-[23vh] -top-[9vh] overflow-hidden border-4 rounded-3xl border-white object-cover'
              style={{ opacity: hoveredProject === index ? '1' : ' 0' }}
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