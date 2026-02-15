type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return <>{children}</>;
}
