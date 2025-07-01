# About `devcontainer.json`

The `devcontainer.json` file is used by Visual Studio Code (VS Code) and compatible tools to define a reproducible, containerized development environment. It specifies the configuration for a development container, including the base image, forwarded ports, installed extensions, and other settings. This ensures that all developers working on the project have a consistent environment, regardless of their local setup.

## Information from This Project's `devcontainer.json`

- **Container Name:**

  - `ICP Dev Environment` — a label for the development container.

- **Base Image:**

  - `ghcr.io/dfinity/icp-dev-env-slim:17` — a Docker image tailored for Internet Computer (ICP) development.

- **Forwarded Ports:**

  - `4943` — labeled as "dfx" (likely for the DFINITY Canister SDK). VS Code will not auto-open this port in the browser.
  - `5173` — labeled as "vite" (for the Vite development server). VS Code will auto-open this port in your browser.

- **VS Code Customizations:**
  - Installs the `dfinity-foundation.vscode-motoko` extension for Motoko language support.

---

This setup provides a consistent, ready-to-use environment for developing ICP applications with Motoko and Vite, making onboarding and collaboration easier for all contributors.
