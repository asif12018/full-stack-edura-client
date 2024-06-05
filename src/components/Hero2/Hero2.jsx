

const Hero2 = () => {
    return (
        <div>

            <section className="px-3 py-5 bg-neutral-100 lg:py-10">
                <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
                    <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
                        <p className="text-4xl font-bold md:text-7xl text-orange-600">25% OFF</p>
                        <p className="text-4xl font-bold md:text-7xl">SUMMER SALE</p>
                        <p className="mt-2 text-sm md:text-lg">For limited time only!</p>
                        <button className="text-lg md:text-2xl bg-[#14452f] text-white py-2 px-5 mt-10 hover:bg-[#2a6e4f]">Enroll Now</button>
                    </div>
                    <div className="order-1 lg:order-2">
                        <img className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]" src="https://i.postimg.cc/J0pCBfBH/Green-Learn-with-Olivia-Education-Instagram-Post.png" alt="" />
                    </div>
                </div>
            </section>

          
        </div>
    );
};

export default Hero2;