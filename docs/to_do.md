# 📝 ICP File-Sharing App To-Do List

Building a simple file-sharing app on the Internet Computer Protocol (ICP) is a great way to explore decentralized application development. Use this checklist to track your progress:

---

## 🛠️ Step 1: Set Up Your Development Environment

- [x] **Start from the FileVault Example** ([GitHub][11], [ICP Ninja][12])
- [x] **Install the DFINITY Canister SDK (`dfx`)** ([Tutorial 1][1])
- [ ] ~~Create a New Project (`dfx new my_file_share_app`) ([Quick start][2])~~
- [ ] ~~Start the Local Internet Computer Replica (`dfx start --background`) ([How to build DApps][3])~~
- [ ] ~~Build and Deploy Locally (`dfx deploy`) ([Tutorial 1][1])~~
- [ ] ~~Review the official tutorial ([Official tutorial][4])~~

_Note: This project is based on the official FileVault example, which already includes a Motoko backend and frontend. See [GitHub][11] and [ICP Ninja][12]._

---

## 📦 Step 2: Implement File Upload and Storage

- [ ] ~~Frontend: Create an HTML form for file selection and upload. Use JavaScript to read files as ArrayBuffer and send to backend.~~
- [ ] ~~Backend (Motoko or Rust): Define a method to accept a `Blob` and store it in stable memory.~~
- [ ] ~~Implement chunked uploads for large files.~~
- [ ] ~~Review file storage strategies ([DFINITY Forum][5])~~

---

## 🔐 Step 3: Add Authentication and Access Control

- [x] ~~Integrate Internet Identity in the frontend for user login ([Identities and authentication][6])~~
- [x] ~~Associate uploaded files with user principal in the backend~~
- [x] ~~Enforce access permissions in the backend~~
- [x] ~~Review authentication docs ([Identities and authentication][6])~~

_Note: Authentication and access control are already implemented in the FileVault example._

---

## 🔐 Step 4: Implement Login with MetaMask (via Privy)

- [x] **Decide on authentication approach: Use Privy for MetaMask login**
- [ ] **Integrate MetaMask login in the frontend using Privy**
- [ ] **Obtain and send Privy JWT to backend**
- [ ] **Verify Privy JWT in backend via microservice**
- [ ] **Map Ethereum addresses (from Privy) to user principals if needed**
- [ ] **Test authentication flow with MetaMask + Privy**
- [ ] **Document the Privy-based login process**

_Note: We intentionally skipped direct ECDSA signature verification in Motoko due to complexity and maintainability. Privy provides a robust, user-friendly, and scalable authentication flow for MetaMask and other wallets._

---

## 🔐 Step 5: Implement Encryption for Secure File Sharing

- [ ] **Encrypt files before upload** (client-side, symmetric encryption) ([Encryption tutorial][4])
- [ ] **Store encrypted files** in the backend
- [ ] **Share decryption keys securely** with recipients
- [ ] **Explore advanced encryption/key management** ([vetKeys tutorial][7])

---

## 📄 Step 6: Explore Example Projects

- [ ] **Review DocuTrack dapp** ([GitHub][8])
  - [ ] **Check out the GitHub repository** ([GitHub][8])
  - [ ] **Try the live demo** ([GitHub][8])
- [ ] **Review DocuTrack's codebase for practical examples** ([GitHub][8])

---

## 🚀 Step 7: Deploy to the Internet Computer Mainnet

- [ ] **Obtain Cycles** (via NNS dapp or faucet) ([How to get cycles][9])
- [ ] **Configure deployment for mainnet** (update `dfx.json`, use `--network ic`) ([How to deploy][9])
- [ ] **Deploy to mainnet** (`dfx deploy --network ic`) ([Quick start][2])
- [ ] **Review deployment guide** ([Deployment guide][2])

---

## 🎥 Additional Resources

- [ ] **Watch the video tutorial** ([YouTube][10])

---

Feel free to check off each item as you complete it!

[1]: https://hwvjt-wqaaa-aaaam-qadra-cai.ic0.app/docs/current/tutorials/deploy_sample_app?utm_source=chatgpt.com "Tutorial 1 - Deploy sample code"
[2]: https://internetcomputer.org/docs/building-apps/getting-started/quickstart?utm_source=chatgpt.com "Quick start | Internet Computer"
[3]: https://dev.to/joshhortt/how-can-we-build-dapps-using-the-internet-computer-2i46?utm_source=chatgpt.com "How can we build DApps using the Internet computer?"
[4]: https://internetcomputer.org/docs/tutorials/developer-liftoff/level-0/first-dapp?utm_source=chatgpt.com "0.6 Deploying your first dapp - Internet Computer"
[5]: https://forum.dfinity.org/t/file-storage-on-ic/9207?utm_source=chatgpt.com "File Storage On IC - Developers - DFINITY Forum"
[6]: https://internetcomputer.org/docs/current/tutorials/developer-liftoff/level-3/3.5-identities-and-auth?utm_source=chatgpt.com "3.5 Identities and authentication - Internet Computer"
[7]: https://internetcomputer.org/docs/tutorials/developer-liftoff/level-5/5.1-vetKeys-tutorial?utm_source=chatgpt.com "5.1 Developing an encrypted notes dapp with vetKeys"
[8]: https://github.com/dfinity/ic-docutrack?utm_source=chatgpt.com "dfinity/ic-docutrack - GitHub"
[9]: https://medium.com/dfinity/building-a-front-end-dapp-on-the-internet-computer-55985f0a595b?utm_source=chatgpt.com "Building a Front-End Dapp on the Internet Computer | by DFINITY"
[10]: https://www.youtube.com/watch?v=19d8TrhWWQk&utm_source=chatgpt.com "ICP Ninja Demo: Build, Deploy, and Customize Dapps on ... - YouTube"
[11]: https://github.com/dfinity/examples/tree/master/motoko/filevault "FileVault Example on GitHub"
[12]: https://icp.ninja/projects/filevault "FileVault on ICP Ninja"
