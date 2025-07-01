# 🧪 How to Get JWTs for Testing Your Backend (Privy)

This guide explains how to obtain or generate JWTs for testing your backend, based on Privy's documentation.

---

## Automated Testing: Mocking a JWT

Privy's recommended best practice for automated testing is to **create and sign your own test JWTs**. This is more stable and secure than using real, live tokens.

### Steps:

1. **Generate a Test Keypair**

   - In your test environment, generate your own ES256 keypair (private key for signing, public key for verifying).
   - Example (using `jose` in JavaScript):
     ```js
     import { generateKeyPair } from "jose";
     const { publicKey, privateKey } = await generateKeyPair("ES256");
     ```

2. **Construct the JWT Payload**

   - Create a JSON object with the claims Privy includes:
     - `sub`: The user's Privy DID (e.g., `did:privy:test-user-123`)
     - `iss`: The issuer, must be `privy.io`
     - `aud`: Your actual Privy App ID
     - `sid`: A session ID (any string)
     - `iat` and `exp`: Issued at and expiration timestamps

3. **Sign the JWT**

   - Use your generated private key to sign the payload with ES256.
   - Example:
     ```js
     import { SignJWT } from "jose";
     const jwt = await new SignJWT(payload).setProtectedHeader({ alg: "ES256" }).sign(privateKey);
     ```

4. **Configure Your Backend for Tests**
   - In your test environment, configure your backend to use your generated public key for verification (not your production Privy key).

> **Why?** This method gives you full control, lets you create tokens for different users/scenarios, and avoids dependency on live Privy services.

---

## Manual, One-Off Testing: Grab a Live Token

If you need a real token for a quick manual test (e.g., Postman or curl), you can grab a live one from your application.

### How to Get a Live Token:

1. **Log in to your app in a development environment.**
2. **Open your browser's Developer Tools.**
3. **Find the Token:**
   - **Cookies:**
     - Go to the "Application" tab → "Cookies". Look for `privy-access-token` or `privy-id-token`.
   - **Network Requests:**
     - In the "Network" tab, inspect requests to your backend. Look for the token in the `Authorization` header or a `privy-id-token` header.
   - **From the SDK:**
     - Use `getAccessToken()` or `useIdentityToken()` from the Privy React SDK and log it to the console.

> **Note:** These are real, live tokens. The access token will expire in one hour. Not suitable for automation.

---

## Summary Table

| Use Case                  | Recommended Method | Why?                                                        |
| ------------------------- | ------------------ | ----------------------------------------------------------- |
| Automated Backend Testing | Mock your own JWTs | Stable, secure, full control, no dependency on live service |
| Manual, One-Off Testing   | Grab a live token  | Quick and easy, but short-lived and not for automation      |

---

**Important:**

- For automated tests, always mock and sign your own JWTs.
- For manual tests, grab a live token from your app, but remember it will expire quickly.
