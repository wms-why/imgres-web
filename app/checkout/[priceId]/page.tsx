'use client';
import { useParams } from "next/navigation";
import CheckOutContent from "./content";

interface PathParams {
  priceId: string;
  [key: string]: string | string[];
}


export default async function CheckoutPage() {

  const { priceId } = useParams<PathParams>();

  return (
    <div className={'w-full min-h-screen relative overflow-hidden'}>
      <CheckOutContent priceId={priceId} />
    </div>
  );
}
