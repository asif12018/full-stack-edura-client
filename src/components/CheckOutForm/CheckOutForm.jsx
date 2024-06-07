import { useContext, useEffect, useState } from "react";
import useAxisoSecure from "../../Hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useTeacherSingleCourse from "../../Hooks/useTeacherSingleCourse";
import { useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { AuthContext } from './../../Provider/AuthProvider';

const CheckOutForm = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxisoSecure();
  const id = useParams();
  
  const [courseDetails, isLoading, refetch] = useTeacherSingleCourse(id.id);

  useEffect(() => {
    if (courseDetails.price) {
      axiosSecure.post('/create-payment-intent', { price: courseDetails.price })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        }).catch(err => {
          console.log(err);
        });
    }
  }, [axiosSecure, courseDetails.price]);

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center"><BounceLoader color="#14452f" /></div>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error?.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      console.log('confirmError', confirmError);
    } else {
      console.log('paymentIntent:', paymentIntent);
      if(paymentIntent.status == 'succeeded'){
        console.log('payment success')
      }
    }
  }

  return (
    <>
      <div>

        <div>
               

        <div className="bg-gray-100 dark:bg-gray-800 py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-cover" src={courseDetails?.coursePhoto} alt="Product Image"/>
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                    </div>
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Product Name</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {courseDetails?.description}
                </p>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                        <span className="text-gray-600 dark:text-gray-300">{courseDetails?.price}$</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Category:</span>
                        <span className="text-gray-600 dark:text-gray-300">{courseDetails?.category}</span>
                    </div>
                </div>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Title:</span>
                        <span className="text-gray-600 dark:text-gray-300">{courseDetails?.title}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Instructor Name:</span>
                        <span className="text-gray-600 dark:text-gray-300">{courseDetails?.fullName}</span>
                    </div>
                </div>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Total Enroll:</span>
                        <span className="text-gray-600 dark:text-gray-300">{courseDetails?.totalEnroll}</span>
                    </div>
                    
                </div>
                
                
               
            </div>
        </div>
    </div>
</div>

              
        </div>


        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>
            <div className="mt-6 sm:mt-8 lg:flex-col lg:items-start lg:gap-12">
              <form onSubmit={handleSubmit}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#FFFFFF',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
                <button className="btn btn-sm btn-primary my-5" type="submit" disabled={(!stripe || !clientSecret || isLoading)}>
                  Pay
                </button>
                <p className="text-red-500 font-bold">{error}</p>
              </form>
              <div className="mt-6 sm:mt-8 lg:mt-0">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">{courseDetails?.price}$</dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                      <dd className="text-base font-medium text-green-500">0</dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">0</dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">0</dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">{courseDetails?.price}$</dd>
                  </dl>
                </div>
                <div className="mt-6 flex items-center justify-center gap-8">
                  <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
                  <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
                  <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                  <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                  <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
                  <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
                </div>
              </div>
              <p className="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
                Payment processed by <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Paddle</a> for <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Flowbite LLC</a> - United States Of America
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default CheckOutForm;
