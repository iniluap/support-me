'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from './button';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from './tooltip';
import { useTheme } from 'next-themes';

export function LightDarkToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant={'secondary'}
              size={'sm'}
              className={className}
              onClick={() => {
                setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
              }}
            />
          }>
          <SunIcon className="block dark:hidden" />
          <MoonIcon className="hidden dark:block" />
        </TooltipTrigger>
        <TooltipContent>
          <span className="inline dark:hidden">Enable dark mode</span>
          <span className="hidden dark:inline">Enable light mode</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
