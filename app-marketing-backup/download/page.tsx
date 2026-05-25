import { Metadata } from "next";
import { ArrowUpRight, Laptop, Monitor, Code, Globe2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "客户端下载 — SupaStore | 大模型客户端推荐",
  description: "下载并配置适合您的开发与对话客户端，包含 Cherry Studio、LobeChat、Cursor 等顶尖 AI 工具。",
};

const clients = [
  {
    name: "Cherry Studio",
    desc: "专为电脑桌面端设计的跨平台多模型聚合管理软件。支持本地知识库、多模态交互，界面极其流畅美观。",
    platform: "macOS / Windows / Linux",
    link: "https://cherry-ai.com/",
    badge: "桌面端首选",
    badgeColor: "bg-primary",
    icon: Laptop,
  },
  {
    name: "LobeChat",
    desc: "现代化、支持插件和语音交互的下一代大模型对话客户端。支持网页端、PWA 以及桌面客户端。",
    platform: "macOS / Windows / Web / iOS / Android",
    link: "https://github.com/lobehub/lobe-chat",
    badge: "功能最全面",
    badgeColor: "bg-secondary",
    icon: Globe2,
  },
  {
    name: "Cursor",
    desc: "目前全球最受欢迎的 AI 智能辅助编程编辑器。通过自定义 OpenAI Base URL，直接接入 SupaStore 极速 API 编写代码。",
    platform: "macOS / Windows / Linux",
    link: "https://cursor.com/",
    badge: "智能编程首选",
    badgeColor: "bg-tertiary text-foreground",
    icon: Code,
  },
  {
    name: "NextChat (ChatGPT Next Web)",
    desc: "轻量级、零配置、一键免费部署的开源 Web/桌面大模型对话界面。首字加载极快，支持自定义 API 代理域名。",
    platform: "macOS / Windows / Web / Android",
    link: "https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web",
    badge: "轻量极速",
    badgeColor: "bg-quaternary text-foreground",
    icon: Monitor,
  },
];

export default function DownloadPage() {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-12 md:py-20 z-10 relative">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
          大模型客户端下载
        </h1>
        <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed">
          SupaStore 支持标准的 OpenAI 兼容协议。您可以使用以下推荐的优秀客户端，填入您的专属 API 密钥与中继地址 <code className="bg-muted px-2 py-1 rounded text-foreground font-mono text-sm">https://supastore.cc/v1</code>，即可立刻开始调用。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {clients.map((client, idx) => {
          const Icon = client.icon;
          return (
            <div
              key={idx}
              className="sticker-card flex flex-col justify-between h-full bg-white relative p-8 group hover:-translate-y-1 transition-transform"
            >
              <div className={`absolute -top-4 right-6 border-2 border-foreground px-4 py-1 rounded-full font-heading font-black text-xs shadow-[2px_2px_0px_0px_#1E293B] ${client.badgeColor}`}>
                {client.badge}
              </div>

              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-foreground bg-tertiary shadow-[4px_4px_0px_0px_#1E293B] mb-8">
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <h2 className="font-heading text-2xl font-black mb-4">
                  {client.name}
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                  {client.desc}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-dashed border-foreground/10 flex items-center justify-between">
                <span className="font-sans text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  支持平台: {client.platform}
                </span>
                <a
                  href={client.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-heading font-black text-primary hover:underline"
                >
                  前往下载
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticker-card bg-secondary/10 border-dashed text-center mt-20 p-12">
        <h3 className="font-heading text-2xl font-black mb-4">
          🎒 需要更详细的接入配置教程吗？
        </h3>
        <p className="font-sans text-muted-foreground mb-8 max-w-2xl mx-auto">
          我们为 Cursor、Claude Code、VS Code Cline 等主流工具编写了手把手的图文配置文档，帮助您解决在代理重定向过程中遇到的所有问题。
        </p>
        <a
          href="/docs"
          className="candy-button inline-flex text-lg"
        >
          查看完整接入文档
        </a>
      </div>
    </div>
  );
}
