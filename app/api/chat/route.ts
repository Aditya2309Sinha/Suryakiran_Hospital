import { NextRequest, NextResponse } from "next/server";

const DEFAULT_WEBHOOK = "https://kryptoxenos.app.n8n.cloud/webhook-test/chatbot-whatsapp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL || DEFAULT_WEBHOOK;

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error("Webhook error:", webhookResponse.status, errorText);
      return NextResponse.json(
        { error: "Failed to get response from chatbot" },
        { status: webhookResponse.status }
      );
    }

    const data = await webhookResponse.json();
    return NextResponse.json({ reply: data.reply || data.message || data.text || "No response" });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}