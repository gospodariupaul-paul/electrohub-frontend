function SidebarLink({
  href,
  icon,
  label,
  active,
  collapsed,
  danger = false,
}: {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
  collapsed: boolean;
  danger?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        active ? "bg-white/20 font-semibold" : "hover:bg-white/10"
      } ${danger ? "text-red-400" : "text-white"}`}
      style={{ justifyContent: collapsed ? "center" : "flex-start" }}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
