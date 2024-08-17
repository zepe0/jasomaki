import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Stripe.css";
const stripePromise = loadStripe(
  "pk_test_51Poq0zCpoWoxyqfn98r7bUexZcSfykOpjKwLyEw2pY3Ly3fBVvraqK0ivDt8tTnvRjNdWIv7SD9mdmnxzLrGTBJl00mC6X7tE7"
);
const API = import.meta.env.VITE_API_URL;
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handelSubmit = async (e) => {
    e.preventDefault();
    // Crear el PaymentIntent en el servidor
    fetch(`${API}eventos/create_Payment.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000 }), // Monto en centavos
    })
      .then((response) => response.json())
      .then((data) => {
        const clientSecret = data.clientSecret;

        // Confirmar el pago con Stripe
        return stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          console.error("Error en la confirmación del pago:", error);
        } else if (paymentIntent.status === "succeeded") {
          console.log("Pago exitoso:", paymentIntent);
        }
      })
      .catch((error) => {
        console.error("Error en el proceso de pago:", error);
      });
  };

  return (
    <form /* onSubmit={handelSubmit} */ className="Card">
    
      <CardElement></CardElement>

      <button>Pagar</button>
    </form>
  );
};
function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Stripe;
