// /* eslint-disable */
// import axios from "axios";
// const stripe = Stripe(
//   "pk_test_51Rw4QgIufLzRVdDEJmHfsnJucXTHSZ2xe5hTaQ9CB4AXlawhPKGKSM32ZEgpCq10ul0u72lFa1wxz53igvJIERC600u5CvaVZZ"
// );

// export const bookTour = async (tourId) => {
//   // 1) Get checkout session from API
//   const session = await axios(
//     `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
//   );
//   console.log(session);

// 2) Create checkout form + change credit card
//     await stripe.redirectToCheckout({
//       sessionId: session.data.session.id
//     });
//   } catch (err) {
//     console.log(err);
//     showAlert('error', err);
//   }
// };

/* eslint-disable */
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { showAlert } from "./alerts";

// loadStripe returns a Promise
const stripePromise = loadStripe(
  "pk_test_51Rw4QgIufLzRVdDEJmHfsnJucXTHSZ2xe5hTaQ9CB4AXlawhPKGKSM32ZEgpCq10ul0u72lFa1wxz53igvJIERC600u5CvaVZZ"
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log("SESSION DATA 👉", session.data);

    // 2) Redirect to checkout
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
