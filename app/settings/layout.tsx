export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simple layout for now, can be expanded with sidebar navigation in the future
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}