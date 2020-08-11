# Arbchain client

![version](https://img.shields.io/badge/version-0.1.0beta-blue)
[![docs](https://img.shields.io/badge/docs-0.1.0-green)](https://arbchain.consensolabs.com)
[![Follow](https://img.shields.io/twitter/follow/consensolabs?style=social&logo=twitter)](https://twitter.com/consensolabs)

Web client for the Arbchain project. This project depends on the Arbchain [`contracts`](https://github.com/arbchain/contracts.git) to feth the contract ABIs and deployment details.

## Getting started

1. Clone the following repos
    ```javascript
    git clone https://github.com/arbchain/web.git
    git clone https://github.com/arbchain/contracts.git
    ```
2. Install `mirror` tool and contract dependencies
    ```
    npm install -g mirror-besu
    cd contracts && npm install
    ```
    
3. Deploy the contracts 
    Navigate to the `contracts` project and update the build path in `mirror-config.js` file from `build` to `../web/src/build` so that it build inside our web project. 
    ```javascript
    cd contracts
    mirror compile
    mirror deploy
    ```
    
4. Install the node dependencies of the web project.
    ```javascript
    cd web
    npm install
    ```

5. Start the dapp, then point your browser to localhost:3000.
    ```javascript
    npm start
    ```
    ```

6. Build the Dapp for production, use the build command. A production build of the entire Dapp will be placed in the /build folder.
    ```javascript
    npm run build || yarn build
    ```
    
