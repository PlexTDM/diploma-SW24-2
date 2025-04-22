import axios from 'axios';
import express from 'express';
import Product from '../models/product.js'
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

const base = "https://api-m.sandbox.paypal.com";

const app = express.Router();

const generateAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
            PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
        ).toString("base64");
        const response = await axios.post(`${base}/v1/oauth2/token`, "grant_type=client_credentials", {
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });

        return response.data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};

const createOrder = async (cart) => {
    console.log(
        "shopping cart information passed from the frontend createOrder() callback:",
        cart,
    );

    const cartItems = await Promise.all(
        cart.map(async (item) => {
            const product = await Product.findById(item.id)
            if(product){
                const price = item.discount ? product.price * (1 - item.discount / 100) : product.price
                return {
                    quantity: item.quantity,
                    price: price.toFixed(2),
                };
            }
        }),
    )
    
    const price = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: price.toFixed(2),
                },
            },
        ],
    };

    const response = await axios.post(url, payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return handleResponse(response);
};

const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await axios.post(url, {}, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return handleResponse(response);
};

async function handleResponse(response) {
    try {
        return {
            jsonResponse: response.data,
            httpStatusCode: response.status,
        };
    } catch (err) {
        throw new Error(response.data);
    }
}

app.post("/orders", async (req, res) => {
    try {
        const { cart } = req.body;
        const { jsonResponse, httpStatusCode } = await createOrder(cart);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
});

app.post("/orders/:orderID/capture", async (req, res) => {
    try {
        const { orderID } = req.params;
        const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to capture order:", error);
        res.status(500).json({ error: "Failed to capture order." });
    }
});

export default app;