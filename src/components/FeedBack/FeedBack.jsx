import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Import autoplay styles if necessary
import { Pagination, Autoplay } from 'swiper/modules'; // Import Autoplay module
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import { BounceLoader } from 'react-spinners';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const FeedBack = () => {
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { data: feedback = [], isLoading: feedbackLoading, refetch } = useQuery({
        queryKey: ['FeedBackAll'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allFeedback');
            return res.data;
        }
    });

    if (feedbackLoading) {
        return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>;
    }

    return (
        <div>
            <section id="testimonials" aria-label="What our customers are saying" className="bg-slate-50 py-20 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                    <div className="mx-auto max-w-2xl md:text-center">
                        <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">What Our Customers Are Saying</h2>
                    </div>
                    <Swiper
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        spaceBetween={30}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }} // Add autoplay configuration
                        modules={[Pagination, Autoplay]} // Include Autoplay module
                        className="mySwiper"
                    >
                        {feedback.map(item => (
                            <SwiperSlide key={item._id}>
                                <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 my-7 h-[300px] md:h-[200px]">
                                    <svg aria-hidden="true" width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
                                        <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"></path>
                                    </svg>
                                    <blockquote className="relative ">
                                        <h3 className='font-bold'>{item?.courseTitle}</h3>
                                        <p className="text-lg tracking-tight text-slate-900">{item?.description}</p>
                                        <div className="rating">
                                            {[...Array(5)].map((_, index) => (
                                                <input
                                                    key={index}
                                                    type="radio"
                                                    name="rating-4"
                                                    className="mask mask-star-2 bg-orange-400"
                                                    checked={item?.rating === index }
                                                    readOnly
                                                />
                                            ))}
                                        </div>
                                    </blockquote>
                                    <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100   ">
                                        <div>
                                            <div className="font-display text-base text-slate-900">{item?.submitterName}</div>
                                        </div>
                                        <div className="overflow-hidden rounded-full bg-slate-50">
                                            <img alt="" className="h-8 w-8 object-cover" src={item?.submitterPhoto} />
                                        </div>
                                    </figcaption>
                                </figure>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </div>
    );
};

export default FeedBack;
