import express from "express";
import { jwtVerify, importSPKI } from "jose";

const app = express();
app.use(express.json());

// Your Privy public key (PEM format from the dashboard)
const PRIVY_PUBLIC_KEY_PEM = `
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEktw2tKVnlijiOmKV6/RnfLyQJhicVi4GX6o5+l6Feyat1UPaKjbkKvBXNZwRJdUe8QwufghMJzBWNX7u9oos0g==
-----END PUBLIC KEY-----
`;

const ALG = "ES256";

let publicKey;

async function setup() {
  // Import the PEM-formatted public key
  publicKey = await importSPKI(PRIVY_PUBLIC_KEY_PEM, ALG);
}

app.post("/verify", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, error: "Missing token" });
  }

  try {
    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: [ALG],
      issuer: "privy.io", // Optional, adjust depending on your JWT contents
    });

    return res.json({
      success: true,
      did: payload.sub,
    });
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({
      success: false,
      error: "Invalid token or signature verification failed.",
    });
  }
});

const PORT = process.env.PORT || 3000;

setup().then(() => {
  app.listen(PORT, () => console.log(`Privy JWT verifier running on port ${PORT}`));
});
