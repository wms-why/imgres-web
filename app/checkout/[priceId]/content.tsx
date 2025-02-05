'use client'
import { loginStore } from "@/store/LoginStore";
import { CheckoutEventsData, Environments, initializePaddle, Paddle } from "@paddle/paddle-js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PathParams {
  priceId: string;
  [key: string]: string | string[];
}

export default function CheckOutContent() {
  const { priceId } = useParams<PathParams>();
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(null);

  const handleCheckoutEvents = (event: CheckoutEventsData) => {
    setCheckoutData(event);
  };

  const { setShowLoginPanel, userInfo } = loginStore();

  if (!userInfo) {
    setShowLoginPanel(true);
  }

  useEffect(() => {
    if (!paddle?.Initialized && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
        eventCallback: (event) => {
          if (event.data && event.name) {
            handleCheckoutEvents(event.data);
          }
        },
        checkout: {
          settings: {
            displayMode: 'inline',
            theme: 'light',
            allowLogout: !userInfo,
            frameTarget: 'paddle-checkout-frame',
            frameInitialHeight: 450,
            frameStyle: 'width: 100%; background-color: transparent; border: none',
            successUrl: '/checkout/success',
          },
        },
      }).then(async (paddle) => {
        if (paddle && priceId) {
          setPaddle(paddle);

          if (userInfo) {
            paddle.Checkout.open({
              ...({ customer: { email: userInfo.email } }),
              items: [{ priceId: priceId, quantity: 1 }],
            });
          }

        }
      });
    }
  }, [userInfo]);

  return (
    <div
      className={
        'rounded-lg md:bg-background/80 md:backdrop-blur-[24px] md:p-10 md:pl-16 md:min-h-[400px] flex flex-col justify-between relative'
      }
    >
      <div className={'flex justify-center flex-1'}>
        <div className={'min-w-[375px] lg:min-w-[535px]'}>
          <div className={'text-base leading-[20px] font-semibold mb-8'}>Payment details</div>
          <div className={'paddle-checkout-frame'} />
        </div>
      </div>
    </div>
  );
}
