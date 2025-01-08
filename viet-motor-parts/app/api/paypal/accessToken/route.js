import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = Buffer.from(
      `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("PayPal API Error:", data);
      return NextResponse.json(
        { error: data.error_description || "Failed to fetch access token." },
        { status: response.status }
      );
    }

    console.log("PayPal Access Token:", data.access_token);
    console.log("Token Expires In:", data.expires_in, "seconds");
    console.log(
      "Token Expiration Time:",
      new Date(Date.now() + data.expires_in * 1000).toISOString()
    );
    return NextResponse.json({ accessToken: data.access_token });
  } catch (error) {
    console.error("Error fetching PayPal access token:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
