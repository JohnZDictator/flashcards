'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

// load Stripe outside of a component's render to avoid recreating Stripe object on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cardholderName, setCardholderName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // send paymentMethod.id to server (use fetch or axios)
            const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
            });

            const checkoutSession = await res.json();

            if (checkoutSession.error) {
                setError(checkoutSession.error);
                setLoading(false);
            } else {
                const { error } = await stripe.redirectToCheckout({
                    sessionId: checkoutSession.id,
                });

                if (error) {
                    setError(error.message);
                }
                setLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-gray-100 rounded-lg mx-4 w-1/3 flex-grow">
            <div className="relative mb-6">
                <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                <input
                    id="cardholderName"
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="peer block w-full h-12 p-4 border-gray-300 bg-white rounded-md placeholder-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    required
                />
            </div>
            <CardElement className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm" />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Button 
                type="submit" 
                disabled={!stripe || loading}
                className="mt-4 px-6 py-3 text-lg"
            >
                {loading ? 'Processing...' : 'Pay $9.99'}
            </Button>
        </form>
    );
};

const PaymentPage = () => {
    return (
        <div className="flex flex-col items-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-8">Complete your purchase</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default PaymentPage;