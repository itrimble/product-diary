---
project: Remnant Security Academy
title: Remnant Academy Gets a Tax Switch and a Payment Fix
summary: The academy's checkout can now collect sales tax once I switch it on, and a payment-recording check that could hide failures was tightened.
---
Remnant Security Academy's checkout gained a switch for charging sales tax, and it is off. I want it left off until I have confirmed where I am registered and how each course is classified, because turning on tax collection before that would be guessing with customers' money. The academy still shows a beta list rather than a buy button, so nobody is paying yet.

The change is in the checkout function, behind a setting named `STRIPE_AUTOMATIC_TAX_ENABLED` that must be exactly "true". With it on, Stripe works out tax, asks for a billing address and always creates a customer record. A comment in the code says the same thing I just did about registrations.

The second fix is in the payment webhook. When it saves an event, a duplicate is an expected error and should be ignored. The old line checked the error code without first checking that an error existed. The new one only throws when there is a real error that is not a duplicate. It is a small correction to a check, and I did not run a test payment to confirm it.

I also wrote a 1,900-word advertising brief. It records that the live site shows only a beta list and tells every ad to point there, never at a purchase. I am not quoting its contents here, and I did not build or deploy anything tonight.
