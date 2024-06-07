import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../CheckOutForm/CheckOutForm";



// const stripePromise = loadStripe('pk_test_51PMVF107SE24j7Vz6u3SJYgjOBOqHBDgD7Aow5fB4lliZ65RvA9EiU5BMIDnpdMXWo4RHgLapgSbLGCFBwXDZMmh00qV90NobZ')
const stripePromise = loadStripe(`pk_test_51PMVF107SE24j7Vz6u3SJYgjOBOqHBDgD7Aow5fB4lliZ65RvA9EiU5BMIDnpdMXWo4RHgLapgSbLGCFBwXDZMmh00qV90NobZ`)
console.log(import.meta.env.VITE_Payment_Gateway_PK)
const PaymentGate = () => {
    
    return (
        <div>
            <Elements stripe={stripePromise}>
                 <CheckOutForm></CheckOutForm>
            </Elements>
        </div>
    );
};

export default PaymentGate;