import { Metadata } from "next";

export const metadata: Metadata = {
  title: "更新日志 — Supaboard 产品迭代记录",
  description:
    "查看 Supaboard 的最新功能更新、线路扩容与系统优化记录。我们不断迭代，只为给您带来更完美的网络体验。",
  alternates: {
    canonical: "/changelog",
  },
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
