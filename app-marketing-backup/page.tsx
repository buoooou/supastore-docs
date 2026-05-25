import Link from "next/link";
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

export const metadata: Metadata = {
  title: "SupaStore — 加速 AGI 的到来 | 高性能大模型中转 API",
  description:
    "为 AI Agent 提供自主的经济网络、智能路由与原生基础设施。让智能体不仅能思考，更能自主协作与价值交换。",
  alternates: {
    canonical: siteConfig.url,
  },
};

const faqs = [
  {
    question: "你们的接口地址和调用格式是怎样的？",
    answer: "我们提供完全兼容 OpenAI 协议的接口服务。Base URL 统一为 `https://supastore.cc/v1`，只需在您的 SDK 或开发插件中替换 API Key 和 API Base URL 即可无缝切换。"
  },
  {
    question: "是否会对我们的提示词和生成代码进行缓存或训练？",
    answer: "绝对不会。SupaStore API 严格遵循无缓存及零日志政策。所有请求均端到端加密直接透传至官方 API，绝不存储或用于任何模型训练，切实保障您的代码隐私与知识产权。"
  }
];

export default function IndexPage() {
  return (
    <MotionProvider>
      <main className="relative overflow-hidden bg-white">
        <DecorativeShapes />

        {/* JSON-LD Structured Data */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <FAQPageJsonLd faqs={faqs} />
        <SoftwareApplicationJsonLd />

        {/* 1. HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 lg:px-8 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 font-heading font-semibold text-xs text-primary mb-8">
                <Star className="w-3.5 h-3.5 fill-primary" />
                基础设施运行正常 · 99.999% 确定性
              </div>

              <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight leading-tight text-foreground mb-6">
                加速 AGI <br />
                <span className="text-primary italic font-serif">的到来</span>
              </h1>

              <p className="font-sans text-base md:text-lg text-muted-foreground max-w-md tracking-normal leading-relaxed mb-10">
                为 AI Agent 提供自主的经济网络、智能路由与原生基础设施。让智能体不仅能思考，更能自主协作与价值交换。
              </p>

              <HeroCTA />
            </div>

            <HeroAnimation />
          </div>
        </section>

        {/* 2. FEATURES SECTION */}
        <section className="relative py-20 px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-neutral-100">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
              高性能智能路由平台
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              融合企业级出海网络线路与 AI 大模型调度机制，为下一代 Intelligent Agent 赋能。
            </p>
          </div>

          <FeaturesGrid />
        </section>

        {/* 3. SECURITY SECTION */}
        <section className="relative py-20 px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SecuritySection />
            <SecurityVisual />
          </div>
        </section>

        {/* 4. PRICING SECTION */}
        <section className="relative py-20 px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-neutral-100">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
              极具性价比的计费方案
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              无论是开发者个人调试，还是企业级大批量并发调用，我们都为您提供完美贴合的套餐方案。
            </p>
          </div>

          <PricingGrid />
        </section>

        {/* 5. TELEGRAM BOT SECTION */}
        <section className="relative py-20 px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-neutral-100">
          <TGBotAnimation />
        </section>

        {/* 6. REFERRAL PROGRAM */}
        <section className="relative py-20 px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-neutral-100">
          <ReferralAnimation />
        </section>

        {/* 7. FAQ SECTION */}
        <section className="relative py-20 px-6 lg:px-8 max-w-4xl mx-auto z-10 border-t border-neutral-100 mb-12">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              常见问题 FAQ
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="sticker-card bg-white hover:bg-neutral-50/40">
                <div className="flex gap-4 items-start">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-base font-bold mb-2">{faq.question}</h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </MotionProvider>
  );
}