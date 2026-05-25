export interface PricePlan {
  name: string
  price: string
  unit: string
  features: string[]
  color: string
  popular: boolean
  isAiToken?: boolean
  customLink?: string
}

export const pricingPlans: PricePlan[] = [
  {
    name: "开发者体验版",
    price: "10",
    unit: "元 / 起",
    features: [
      "内含 $1.5 额度 (约对标 10 元官方额度)",
      "支持所有主流模型接入",
      "单 Key 限制 5 QPS 并发",
      "无过期时间，适合个人体验与调试",
    ],
    color: "bg-white",
    popular: false,
    customLink: "https://supastore.cc/console/topup",
  },
  {
    name: "专业开发套餐",
    price: "50",
    unit: "元 / 起",
    features: [
      "内含 $8 额度 (价值约合 56 元)",
      "高可用专用并发通道",
      "单 Key 提升至 20 QPS 并发",
      "完美支持 Cursor / Claude Code 大吞吐量工具",
    ],
    color: "bg-tertiary",
    popular: true,
    customLink: "https://supastore.cc/console/topup",
  },
  {
    name: "企业与团队套餐",
    price: "200",
    unit: "元 / 起",
    features: [
      "内含 $33 额度 (价值约合 230 元)",
      "独立企业级备份集群，延迟更低",
      "单 Key 提升至 50 QPS 并发",
      "提供专用独立域名与专属技术支持",
    ],
    color: "bg-white",
    popular: false,
    customLink: "https://supastore.cc/console/topup",
  },
  {
    name: "大额按需充值",
    price: "1:1",
    unit: "官方对齐",
    features: [
      "汇率永久 1:1 锚定官方",
      "适合大规模数据清洗或长期项目",
      "支持企业批量开票与合同签署",
      "未使用余额支持无缝退款",
    ],
    color: "bg-white",
    popular: false,
    customLink: "https://supastore.cc/console/topup",
  },
]