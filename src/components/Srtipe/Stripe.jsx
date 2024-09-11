import React, { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

const stripePromise = loadStripe(
  "pk_test_51Poq0zCpoWoxyqfn98r7bUexZcSfykOpjKwLyEw2pY3Ly3fBVvraqK0ivDt8tTnvRjNdWIv7SD9mdmnxzLrGTBJl00mC6X7tE7"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.success("Pago exitoso");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || isLoading}>
        {isLoading ? "Procesando..." : "Pagar ahora"}
      </button>
    </form>
  );
};

const Stripe = ({ cuantia }) => {
  const [clientSecret, setClientSecret] = useState("");
  console.log(cuantia);
  useEffect(() => {
    fetch(`${API}pagos/crearPaymentIntents.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  const closeModal = () => {
    document.getElementById("pagar").close();
  };

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <button onClick={closeModal}>X</button>
          {cuantia ?<p style={{color:"black",withd:"100%",textAlign :"center"}}> {cuantia}€</p> : ""}
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Stripe;
