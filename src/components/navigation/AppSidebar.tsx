
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Logo from '@/components/common/Logo';
import { NAV_ITEMS } from '@/data/petInfo';
import { cn } from '@/lib/utils';

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r" collapsible="icon">
      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.name}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  className={cn(
                    'w-full justify-start',
                    pathname === item.href && 'bg-sidebar-accent text-sidebar-accent-foreground'
                  )}
                  tooltip={item.name}
                  asChild
                >
                  <a>
                    {/* Icon size is now handled by SidebarMenuButton's internal styling (size-4) */}
                    <item.icon /> 
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
