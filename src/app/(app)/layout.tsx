import AppSidebar from '@/components/navigation/AppSidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import AppPageHeader from '@/components/common/AppPageHeader';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col overflow-hidden">
        <AppPageHeader />
        <ScrollArea className="flex-1">
          <main className="container mx-auto p-4 py-6 sm:p-6 lg:p-8">
            {children}
          </main>
        </ScrollArea>
      </SidebarInset>
    </div>
  );
}
