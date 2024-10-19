import { apiConnector } from "../apiconnector";
import { eventEndPoints } from "../api";
import { toast } from "react-hot-toast";
import rzplogo from "../../assets/logo/cmapusSync.png";

const { TICKET_PAYMENT_API, PAYMENT_VERIFY_API, FREE_EVENT_API } =
  eventEndPoints;

function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyTicket(
  userId: string,
  eventId: string,
  navigate: any,
  token: string,
  userDetails: any,
  ticketPrice: number
) {
  const toastId = toast.loading("Please wait.....", {
    position: "bottom-center",
    duration: Infinity,
  });
  console.log({ ticketPrice });
  try {
    if (ticketPrice == 0) {
      const freeOrderResponse = await apiConnector(
        "POST",
        FREE_EVENT_API,
        { eventId, userId },
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!freeOrderResponse.data.success) {
        toast.error(freeOrderResponse.data.message);
        console.log("buyTicket -> freeOrderResponse", freeOrderResponse);
        toast.dismiss(toastId);
        return;
      }

      toast.dismiss(toastId);
      toast.success("Payment Successful!");
      navigate("/events");
      return;
    }

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const orderResponse = await apiConnector(
      "POST",
      TICKET_PAYMENT_API,
      { eventId, userId },
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      toast.error(orderResponse.data.message);
      console.log("buyTicket -> orderResponse", orderResponse);
      toast.dismiss(toastId);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      currency: orderResponse.data.currency,
      amount: orderResponse.data.amount.toString(),
      order_id: orderResponse.data.orderId,
      name: "Event Ticket",
      description: "Thank you for purchasing the ticket",
      image: rzplogo,
      prefill: {
        name: userDetails?.name,
        email: userDetails?.email,
      },
      handler: async function (response: any) {
        console.log("buyTicket -> response", response);
        verifyPayment(response, eventId, token, navigate);
      },
      theme: {
        color: "#686CFD",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function () {
      toast.error("Payment Failed");
    });

    toast.dismiss(toastId);
  } catch (error) {
    toast.dismiss(toastId);
    toast.error("Something went wrong");
    console.log("buyTicket -> error", error);
  }
}

async function verifyPayment(
  response: any,
  eventId: string,
  token: string,
  navigate: any
) {
  const toastId = toast.loading("Please wait while we verify your payment");
  try {
    const res = await apiConnector(
      "POST",
      PAYMENT_VERIFY_API,
      {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        eventId,
      },
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      toast.error(res.data.message);
      return;
    }

    toast.success("Payment Successful!");
    navigate("/events");
  } catch (err) {
    toast.error("Payment Verification Failed");
    console.log("verifyPayment -> error", err);
  } finally {
    toast.dismiss(toastId);
  }
}
