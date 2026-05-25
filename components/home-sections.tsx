"use client";

import Link from "next/link";
import { DynamicRegisterLink } from "@/components/dynamic-register-link";
import {
  ArrowRight, Brain, ShieldCheck, Zap, Star,
  ChevronRight, Check, HelpCircle, MessageSquare,
  Globe2, Bot, Building2
} from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { pricingPlans } from "@/config/price";

const fadeInUp = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }
  }
};

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

export function DecorativeShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <m.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[5%] -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
      />
      <m.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[15%] -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
      />
    </div>
  );
}

export function HeroAnimation() {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative flex justify-center lg:justify-end"
    >
      <div className="relative z-10 w-full max-w-[400px] aspect-square rounded-2xl border border-neutral-100 bg-white p-6 shadow-xl flex items-center justify-center">
        <div className="absolute inset-0 bg-neutral-50/50 dot-grid rounded-2xl opacity-60" />
        <div className="w-32 h-32 rounded-3xl bg-primary flex items-center justify-center shadow-lg">
          <Icons.logo className="w-16 h-16 text-white" />
        </div>
      </div>
      <div className="absolute -inset-4 bg-primary/5 rounded-full filter blur-2xl -z-10 animate-pulse" />
    </m.div>
  );
}

export function HeroCTA() {
  return (
    <m.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      className="flex flex-wrap gap-4"
    >
      <DynamicRegisterLink href={siteConfig.registerUrl} className="candy-button text-base group">
        立即注册，领体验流量
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </DynamicRegisterLink>
      <Link
        href="/download"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-8 py-3.5 font-heading font-semibold text-foreground hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 shadow-sm active:scale-[0.99]"
      >
        下载客户端
      </Link>
    </m.div>
  );
}

export function FeaturesGrid() {
  const features = [
    {
      title: "极速专线接入 (ToC)",
      desc: "采用 IPLC/IEPL 国际专线，越过公网拥堵，延迟极低，晚高峰依然稳如泰山。",
      icon: Zap,
      color: "bg-primary/10 text-primary",
      delay: 0.05
    },
    {
      title: "跨境电商专线 (ToB)",
      desc: "为 TikTok、亚马逊运营打造的纯净原生 IP，防关联设计，千兆带宽确保直播流畅。",
      icon: Globe2,
      color: "bg-secondary/10 text-secondary",
      delay: 0.1
    },
    {
      title: "流媒体全解锁",
      desc: "完美支持 Netflix, Disney+, YouTube Premium 等服务，随时畅享 4K 高清视频。",
      icon: Star,
      color: "bg-indigo-50 text-indigo-600",
      delay: 0.15
    },
    {
      title: "AI Token 中转 (ToB)",
      desc: "直通 Claude 等海外顶级 AI 大模型，提供稳定 API 中转额度，赋能开发者和企业。",
      icon: Bot,
      color: "bg-emerald-50 text-emerald-600",
      delay: 0.2
    },
    {
      title: "多端完美适配",
      desc: "支持 Windows, macOS, Android, iOS 以及路由器插件，一个账号，全平台通用。",
      icon: ShieldCheck,
      color: "bg-blue-50 text-blue-600",
      delay: 0.25
    },
    {
      title: "企业级 SLA 保障",
      desc: "面向 B 端客户提供超高可用性，专属 7x24 小时技术支持，护航出海核心业务。",
      icon: Building2,
      color: "bg-purple-50 text-purple-600",
      delay: 0.3
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, i) => (
        <m.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: feature.delay }}
          className="sticker-card group hover:bg-neutral-50/50"
        >
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm", feature.color)}>
            <feature.icon className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold mb-3">{feature.title}</h3>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            {feature.desc}
          </p>
        </m.div>
      ))}
    </div>
  );
}

export function SecuritySection() {
  const securityItems = [
    {
      title: "端到端加密与数据隔离",
      desc: "全站采用高强度 SSL/TLS 加密传输，严密保障您的每一条提示词（Prompts）与代码上下文隐私。",
      icon: ShieldCheck,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "无缓存与无日志政策",
      desc: "系统绝不缓存或分析您的输入数据 and 模型生成结果，您的代码与核心业务机密安全由技术手段直接保障。",
      icon: Brain,
      color: "bg-secondary/10 text-secondary"
    },
    {
      title: "99.999% 运行确定性",
      desc: "多机区动态分流与灾备，即时应对任何突发的大模型厂商网络故障或拥堵，确保关键智能体稳定在线。",
      icon: Zap,
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  return (
    <div>
      <m.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
          不仅高效，更要 <br />
          <span className="text-primary">安全可靠与隐私受控</span>
        </h2>
      </m.div>
      <div className="space-y-6">
        {securityItems.map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm bg-white", item.color)}>
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold mb-1">{item.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingGrid() {
  const plans = pricingPlans;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {plans.map((plan, i) => (
        <m.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className={cn(
            "sticker-card flex flex-col h-full relative",
            plan.popular && "ring-2 ring-primary ring-offset-2"
          )}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white px-3.5 py-0.5 rounded-full font-heading font-semibold text-xs shadow-sm z-20 whitespace-nowrap">
              最受欢迎
            </div>
          )}
          {plan.isAiToken && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3.5 py-0.5 rounded-full font-heading font-semibold text-xs shadow-sm z-20 whitespace-nowrap">
              AI 工具特供
            </div>
          )}
          <div className="mb-6">
            <h3 className="font-heading text-lg font-bold mb-3 min-h-[40px] flex items-center">{plan.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">¥{plan.price}</span>
              <span className="text-xs text-muted-foreground font-medium">{plan.unit}</span>
            </div>
          </div>
          <ul className="space-y-3.5 mb-8 flex-grow">
            {plan.features.map((feature, j) => (
              <li key={j} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="font-sans text-xs font-medium text-neutral-600 leading-tight">{feature}</span>
              </li>
            ))}
          </ul>

          {plan.customLink ? (
            <Link
              href={plan.customLink}
              target="_blank"
              className="candy-button w-full text-center py-3 justify-center text-sm font-semibold"
            >
              前往平台订阅
            </Link>
          ) : (
            <DynamicRegisterLink
              href={siteConfig.registerUrl}
              className="candy-button w-full text-center py-3 justify-center text-sm font-semibold"
            >
              立即订阅
            </DynamicRegisterLink>
          )}
        </m.div>
      ))}
    </div>
  );
}

export function SecurityVisual() {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative flex justify-center lg:justify-end"
    >
      <div className="relative w-full max-w-[480px] rounded-2xl border border-neutral-100 bg-neutral-900 p-8 overflow-hidden aspect-video flex flex-col justify-between shadow-lg">
        <div className="absolute inset-0 bg-primary/5 dot-grid opacity-30" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-700 bg-neutral-800/80 backdrop-blur-sm font-heading font-semibold text-sm text-white mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            企业级安全隔离保障
          </div>
          <p className="font-sans text-xs text-neutral-400 font-medium tracking-wider uppercase">
            Protected by SupaStore Shield
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-neutral-800 pt-4 mt-8">
          <div>
            <div className="font-heading font-bold text-white text-base">100% Uptime</div>
            <div className="font-sans text-xs text-neutral-400 mt-0.5">过去 365 天运行表现</div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>
    </m.div>
  );
}

export function ReferralAnimation() {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="sticker-card bg-neutral-50/50 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12"
    >
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 bg-white font-heading font-semibold text-xs text-neutral-600 mb-4 shadow-sm">
          🎁 独乐乐不如众乐乐
        </div>
        <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">
          加入「全民合伙人」计划 <br />
          <span className="text-primary">赚取丰厚被动收入</span>
        </h2>
        <p className="font-sans text-base text-muted-foreground mb-6 max-w-xl leading-relaxed">
          邀请身边的开发者和团队接入 SupaStore，可获得高达 <span className="font-bold text-foreground underline decoration-primary decoration-2">15% 的终身循环提成</span>。一起共享被动收益！
        </p>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <Link href="/affiliate" className="candy-button text-sm group py-3">
            查看返佣详情
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
      <div className="relative w-full md:w-1/4 aspect-square max-w-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/5 rounded-full filter blur-xl animate-pulse" />
        <div className="absolute w-36 h-36 rounded-2xl border border-neutral-100 bg-white flex flex-col items-center justify-center shadow-md">
          <div className="text-3xl font-bold text-primary mb-1">15%</div>
          <div className="font-heading font-bold text-[10px] text-neutral-400 tracking-wider uppercase">佣金比例</div>
        </div>
      </div>
    </m.div>
  );
}

export function TGBotAnimation() {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="sticker-card bg-neutral-900 text-white p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[80px] -mr-40 -mt-40" />

      <div className="flex-1 text-center lg:text-left relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-700 bg-neutral-800 text-xs font-semibold mb-6">
          <MessageSquare className="w-3.5 h-3.5" />
          智能运维助手
        </div>
        <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">
          TG 助手机器人 <br />
          <span className="text-primary">随时随地 快捷管理</span>
        </h2>
        <p className="font-sans text-base text-neutral-400 mb-8 max-w-md leading-relaxed">
          无需登录网页，直接在 Telegram 机器人中查询您的钱包余额、一键提取或生成 API 密钥、接收额度预警推送。
        </p>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          <Link
            href="https://t.me/supaboard_vpn_bot"
            className="bg-primary text-white px-6 py-3.5 rounded-xl font-heading font-semibold text-sm flex items-center gap-2 hover:bg-primary/95 transition-all shadow-sm active:scale-[0.99] border border-primary"
          >
            立即使用 @supaboard_vpn_bot
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-1/3 relative z-10">
        <div className="rounded-xl border border-neutral-800 bg-neutral-800/50 backdrop-blur-md p-6">
          <div className="space-y-3.5">
            {[
              { label: "额度查询", value: "实时同步" },
              { label: "余额提醒", value: "自动推送" },
              { label: "密钥获取", value: "一键生成" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b border-neutral-800 pb-2 last:border-0 last:pb-0">
                <span className="font-sans text-xs text-neutral-400 font-bold uppercase">{item.label}</span>
                <span className="font-heading text-sm font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </m.div>
  );
}
