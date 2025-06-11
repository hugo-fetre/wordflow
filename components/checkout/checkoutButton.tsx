'use client';

import { useState } from 'react';
import React from 'react'

const CheckoutButton = ({ priceId }: { priceId: string }) => {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        const res = await fetch('/api/stripe/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ priceId }),
        });

        const data = await res.json();

        if (data.url) {
            window.location.href = data.url;
        } else {
            alert('Erreur lors de la création de la session Stripe.');
            console.error(data.error);
        }

        setLoading(false);
    };

    return (
         <button onClick={handleCheckout} disabled={loading} className='secondaryButton'>
            {loading ? 'Redirection...' : 'Suivant'}
        </button>
    )
}

export default CheckoutButton