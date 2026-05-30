import { NextRequest, NextResponse } from "next/server";
import { allProducts } from "@/lib/catalog";

interface GenerateRequest {
  product: string;
  platform: string;
  companyName: string;
  whatsappNumber: string;
}

function generateFromTemplates(product: typeof allProducts[0], platform: string) {
  const brandTag = product.brand.replace(/\s/g, "");

  const captionTemplates = [
    `${product.name} — ${product.processor}, ${product.ram} RAM, ${product.storage}. Only KES ${product.price.toLocaleString()}! Quality guaranteed by KALINITECH SYSTEMS. WhatsApp to order. ${product.condition === "Brand New" ? "Brand New Sealed Unit!" : "Professionally refurbished with warranty."}`,
    `Looking for a reliable ${product.brand} laptop? The ${product.name} delivers ${product.features} at just KES ${product.price.toLocaleString()}. Limited stock available — DM or WhatsApp us now!`,
    `Business-grade performance meets affordability. ${product.name} — ${product.processor}, ${product.ram} RAM, ${product.storage}. KES ${product.price.toLocaleString()} at KALINITECH SYSTEMS. Your trusted tech partner in Kenya.`,
    `Upgrade your workspace with the ${product.name}! ${product.processor}, ${product.ram} RAM, ${product.display} display. ${product.offer} — KES ${product.price.toLocaleString()}. Order via WhatsApp!`,
    `${product.condition === "Brand New" ? "BRAND NEW" : "Quality Refurbished"}: ${product.name}. ${product.processor} | ${product.ram} RAM | ${product.storage}. KES ${product.price.toLocaleString()}. ${product.offer}. DM us or WhatsApp to secure yours!`,
    `Deal Alert! ${product.name} — ${product.features}. Only KES ${product.price.toLocaleString()}. Trusted by businesses across Kenya. WhatsApp KALINITECH SYSTEMS to order now!`,
  ];

  const hashtagSets = [
    `#KalinitechSystems #LaptopsKenya #${brandTag}Laptop #TechDealsKenya #LaptopDeals #NairobiTech #KenyaBusiness #AffordableLaptops`,
    `#${brandTag} #RefurbishedLaptops #KenyaTech #Kalinitech #AffordableLaptops #EastAfricaTech #LaptopSale #BusinessLaptop`,
    `#LaptopSale #${product.category.replace(/\s/g, "")} #TechKenya #KalinitechSystems #BusinessLaptop #LaptopOffers #KenyaDeals #TechSolutions`,
    `#${brandTag}Laptop #LaptopsNairobi #KalinitechSystems #TechEastAfrica #LaptopDealsKenya #BusinessTech #AffordableTech`,
    `#LaptopDeals #${brandTag} #RefurbishedLaptopsKenya #Kalinitech #TechDeals #LaptopOffers #NairobiBusiness #KenyaTech`,
    `#BusinessLaptop #KalinitechSystems #${brandTag}Deals #LaptopKenya #TechSale #EastAfrica #QualityLaptops #BestPrices`,
  ];

  const ctaTemplates = [
    `WhatsApp us at +254790493120 to order the ${product.name}!`,
    `DM us or WhatsApp +254790493120 for ${product.name} — limited stock!`,
    `Click the link in bio or WhatsApp +254790493120 to get your ${product.name} today!`,
    `Order now via WhatsApp: +254790493120. ${product.name} — KES ${product.price.toLocaleString()}`,
    `Secure your ${product.name} — WhatsApp KALINITECH SYSTEMS at +254790493120`,
  ];

  let caption = captionTemplates[Math.floor(Math.random() * captionTemplates.length)];
  const hashtags = hashtagSets[Math.floor(Math.random() * hashtagSets.length)];
  let cta = ctaTemplates[Math.floor(Math.random() * ctaTemplates.length)];

  if (platform === "X (Twitter)") {
    caption = `${product.name} — ${product.processor}, ${product.ram} RAM. KES ${product.price.toLocaleString()}. ${product.offer}. WhatsApp +254790493120`;
  } else if (platform === "Instagram") {
    caption = `${caption}\n\n${hashtags}\n\n${cta}`;
  } else if (platform === "TikTok") {
    caption = `${product.name} is a GAME CHANGER! ${product.processor}, ${product.ram} RAM for just KES ${product.price.toLocaleString()}. Link in bio to order!`;
  } else if (platform === "WhatsApp Status") {
    caption = `${product.name}\n${product.processor} | ${product.ram} | ${product.storage}\nKES ${product.price.toLocaleString()}\n${product.offer}\n\nWhatsApp +254790493120 to order`;
  }

  const nameTemplates = [
    `${product.name} — ${product.offer}`,
    `${product.brand} ${product.category} Deal — ${product.offer}`,
    `Limited Offer: ${product.name}`,
    `${product.offer} — ${product.brand} Special`,
  ];

  return {
    caption,
    hashtags,
    cta,
    name: nameTemplates[Math.floor(Math.random() * nameTemplates.length)],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();
    const { product: productName, platform } = body;

    const product = allProducts.find((p) => p.name === productName);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Try using z-ai-web-dev-sdk for AI-generated content
    let aiContent = null;
    try {
      const ZAI = (await import("z-ai-web-dev-sdk")).default;
      const zai = await ZAI.create();

      const platformGuidance: Record<string, string> = {
        Facebook: "Write a professional Facebook post, 1-3 paragraphs, conversational but business-focused. Include pricing.",
        Instagram: "Write an Instagram caption that is visually descriptive, engaging, and includes a call to action. Use line breaks for readability.",
        TikTok: "Write a short, punchy TikTok caption. Use energetic language. Keep it under 150 characters for the main text.",
        "X (Twitter)": "Write a concise tweet under 280 characters. Be direct and compelling.",
        Telegram: "Write a Telegram channel post. Be informative and structured with clear formatting.",
        "WhatsApp Status": "Write a WhatsApp Status message. Keep it short, personal, and direct. Include key specs and price.",
      };

      const prompt = `You are a social media marketing expert for KALINITECH SYSTEMS, a technology company in Kenya selling laptops and tech services.

${platformGuidance[platform] || platformGuidance.Facebook}

Product: ${product.name}
Brand: ${product.brand}
Category: ${product.category}
Processor: ${product.processor}
RAM: ${product.ram}
Storage: ${product.storage}
Display: ${product.display}
Price: KES ${product.price.toLocaleString()}
Condition: ${product.condition}
Key Features: ${product.features}
Special Offer: ${product.offer}

Company: KALINITECH SYSTEMS
WhatsApp: +254790493120
CEO: JARED ANDIKA

RULES:
- Be unique and creative with different messaging each time
- Include accurate product specifications and pricing
- End with a WhatsApp CTA directing to +254790493120
- Do NOT make false claims about the product
- Maintain professional KALINITECH SYSTEMS brand voice
- Vary the taglines and hooks between posts
- Include relevant hashtags

Respond in JSON format:
{
  "caption": "the main post text",
  "hashtags": "#hashtag1 #hashtag2 ...",
  "cta": "the call-to-action text",
  "name": "campaign name"
}`;

      const completion = await zai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a social media marketing expert. Always respond with valid JSON." },
          { role: "user", content: prompt },
        ],
      });

      const content = completion.choices?.[0]?.message?.content;
      if (content) {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          aiContent = JSON.parse(jsonMatch[0]);
        }
      }
    } catch {
      // SDK not available or error — use template generation
    }

    const result = aiContent || generateFromTemplates(product, platform);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Content generation error:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
