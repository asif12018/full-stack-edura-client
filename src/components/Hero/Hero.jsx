

const Hero = () => {
    return (
        <div className="relative">
            <section className="bg-[url('https://i.postimg.cc/65JH39bw/abstract-green-texture-background-free-vector.jpg')] bg-no-repeat bg-center bg-cover">
                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-evenly">
                    <div className="flex flex-1 items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 ">
                        <img src="https://lizza.wpengine.com/lms/wp-content/uploads/sites/12/2024/02/AdobeStock_545875468@2x-1.webp" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                    </div>
                    <div className="flex flex-1  flex-col justify-center p-6 text-center rounded-sm lg:max-w-3xl lg:text-left text-white">
                        <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-none ">Top Notch Education & Research
                        </h1>
                        <p className="mt-6  text-lg ">At Top Notch Education & Research, we believe that education is the key to unlocking potential. Our expert faculty, cutting-edge research, and supportive community create an environment where students and researchers thrive and achieve their goals
                            
                        </p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded bg-[#14452f] dark:text-gray-50">Try It</a>
                            <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded dark:border-white">Watch Demo Class</a>
                        </div>
                    </div>
                </div>
                
            </section>
            <div className='hidden md:block w-full md:w-4/5 bg-white py-6  mx-auto md:-translate-y-24 '>
                <h3 className='text-center text-4xl font-bold '>Over 6000+ Courses In One Place</h3>
                <div className='flex flex-col md:flex-row justify-evenly gap-2'>
                    <div className=' flex justify-center items-center px-2'>
                        <img className='max-w-[200px]' src="https://i.postimg.cc/fWg8czg6/logo-udemy-purple-animation.gif" alt="" />
                    </div>
                    <div className=' flex justify-center items-center px-2'>
                        <img className='max-w-[200px]' src="https://i.postimg.cc/85kV6pn7/images.png" alt="" />
                    </div>
                    <div className=' flex md:hidden lg:flex justify-center items-center px-2'>
                        <img className='max-w-[200px]' src="https://i.postimg.cc/0QLjdJgt/2560px-Khan-Academy-logo-2018-svg.png" alt="" />
                    </div>
                    <div className='flex md:hidden lg:flex  justify-center items-center px-2'>
                        <img className='max-w-[200px]' src="https://i.postimg.cc/GpyZTBQ3/10-minute-school-b445095037b35ab24bc93e930251c40e.webp" alt="" />
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default Hero;