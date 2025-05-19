import { SidebarTrigger } from '@/components/ui/sidebar';
import Logo from '@/components/common/Logo';

export default function AppPageHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur md:justify-start md:gap-4">
      <div className="md:hidden">
        <Logo size="default" />
      </div>
      <SidebarTrigger className="md:flex" />
      {/* Placeholder for breadcrumbs or page title if needed */}
      <div className="hidden flex-1 items-center justify-center md:flex">
        {/* <h1 className="text-xl font-semibold">Dashboard</h1> */}
      </div>
      <div className="w-10 md:hidden"> {/* Spacer for mobile to balance trigger */}
      </div>
    </header>
  );
}
