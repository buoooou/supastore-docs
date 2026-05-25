const fs = require('fs');
const path = require('path');

const logPath = '/Users/zhangkuo/.gemini/antigravity/brain/bfa54887-d491-4a41-a5ae-31fbeec52c0e/.system_generated/logs/overview.txt';
const targetPath = path.join(__dirname, '../app/(marketing)/page.tsx');

try {
  const content = fs.readFileSync(logPath, 'utf8');
  const lines = content.split('\n');

  let found = null;
  for (const line of lines) {
    if (line.includes('"step_index":194') || line.includes('"step_index": 194')) {
      found = JSON.parse(line);
      break;
    }
  }

  if (found && found.tool_calls && found.tool_calls[0]) {
    // The ReplacementContent is a string. If it contains escaped quotes, let's make sure it's written cleanly.
    let replacement = found.tool_calls[0].args.ReplacementContent;
    
    // In JSON, if it was stored as a string, parsing the outer JSON parses the string content correctly.
    // However, if the JSON was double escaped (e.g. "\"code\""), we might get a string starting with quotes.
    if (replacement.startsWith('"') && replacement.endsWith('"')) {
      replacement = JSON.parse(replacement);
    }

    const fullCode = `import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Star, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  DecorativeShapes,
  HeroAnimation,
  HeroCTA,
  FeaturesGrid,
  SecuritySection,
  SecurityVisual,
  PricingGrid,
  ReferralAnimation,
  TGBotAnimation,
  MotionProvider,
} from "@/components/home-sections";
import { OrganizationJsonLd, WebSiteJsonLd, FAQPageJsonLd, SoftwareApplicationJsonLd } from "@/components/json-ld";

${replacement}`;

    fs.writeFileSync(targetPath, fullCode, 'utf8');
    console.log("Successfully restored landing page code to app/(marketing)/page.tsx!");
  } else {
    console.error("Step 194 log entry not found.");
  }
} catch (err) {
  console.error("Error restoring file:", err);
}
