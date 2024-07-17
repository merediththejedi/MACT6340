"use strict";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    let userAddress = null;
    let connect = document.querySelector("#wallet-connect");

    if (!connect) {
        console.error("Connect Wallet button not found");
        return;
    }

    console.log("Connect Wallet button found");

    if (typeof window.ethereum === 'undefined') {
        console.error('MetaMask is not installed!');
        connect.innerHTML = "MetaMask Not Installed";
        return;
    }

    console.log("MetaMask is installed");

    connect.addEventListener("click", async (event) => {
        event.preventDefault();  // Prevent the default anchor behavior
        console.log("Connect Wallet button clicked");
        await connectWallet();
    });

    async function connectWallet() {
        try {
            console.log("Requesting wallet connection");
            const data = await window.ethereum.request({ method: "eth_requestAccounts" });
            userAddress = data[0];
            let walletString = userAddress.substring(0, 5) + "..." + userAddress.substring(38, 42);
            connect.innerHTML = walletString;
            console.log("Wallet connected:", userAddress);
            return userAddress;
        } catch (err) {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                console.log("Please connect a wallet.");
            } else {
                console.error(err);
            }
        }
    }
});



import express from 'express';
import dotenv from 'dotenv';
import * as utils from './utils/utils.js';
import { connect, getAllProjects } from './utils/database.js'; // Updated import

dotenv.config();

const app = express();
const port = 3000; // Changed port number
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));



// Connect to the database when the server starts
connect().then(() => {
    console.log('Database connected successfully.');
}).catch(err => {
    console.error('Database connection failed:', err);
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/featured", (req, res) => {
    res.render("featured");
});

app.get("/projects", (req, res) => {
    res.render("projects");
});

app.listen(port, () => {
    console.log(`App running @ http://localhost:${port}`);
});

