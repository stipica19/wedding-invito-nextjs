export default async function AdminDashboardPage() {
  // TODO: Use getServerSession from next-auth and enforce role=admin.
  // const session = await getServerSession(authOptions);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-sm text-gray-500">
        TODO: Add moderation queue, metrics, and publish controls.
      </p>
    </div>
  );
}
