# Privy JWT Verifier Microservice

This is a minimal Node.js microservice designed to verify Privy-issued JWTs (JSON Web Tokens) for user authentication in our Internet Computer (ICP) application.

---

## 📌 Why This Microservice Exists

The Internet Computer (ICP) currently **cannot perform ES256 JWT signature verification inside canisters** (whether written in Motoko or Rust).  
This is because:

- Privy signs JWTs using the **ES256 (ECDSA with P-256 curve)** algorithm.
- ICP canisters **lack cryptographic libraries for ES256 JWT verification**, and verifying ECDSA signatures on this curve is not natively supported for JWT workflows.

**Privy does not provide an external API for token verification.**  
JWTs are designed to be verified locally using a known public key.

---

## ✅ Solution: Serverless / Microservice JWT Verification

This microservice is a **small Node.js/Express app** whose **only job is:**

1. **Receive a JWT (from our ICP canister via HTTPS outcall).**
2. **Verify the JWT signature and claims using our Privy App’s public key.**
3. **Return a simple JSON response indicating success/failure and the user's Privy DID.**

This pattern allows us to:

- **Keep our ICP canister lean and focused.**
- **Offload cryptographic verification to a small, isolated, scalable, and cheap off-chain component (serverless or containerized).**
- **Maintain a mostly on-chain architecture, while solving this unavoidable off-chain verification requirement.**

---

## ✅ Deployment Targets

This microservice is designed to run on:

- AWS Lambda
- Google Cloud Functions
- Cloudflare Workers (with Node.js adaptation)
- Or any minimal Node.js server (for local development)

---

## ✅ Expected Usage Flow:

1. **Frontend:**  
   User authenticates with Privy on the frontend and receives a Privy JWT.

2. **Frontend → ICP Canister:**  
   Frontend sends this JWT to the ICP canister as part of an API call.

3. **Canister → This Microservice (HTTPS Outcall):**  
   The canister makes an HTTPS outcall to this microservice, sending the JWT.

4. **Microservice:**  
   Verifies the JWT and returns a response like:

```json
{
  "success": true,
  "did": "did:privy:abcd1234"
}
```
