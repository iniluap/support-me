import { LightDarkToggle } from '@/components/ui/light-dark-toggle';

type Props = {
  children?: React.ReactNode;
};

export default function LoggedOutLayout({ children }: Props) {
  return (
    <main className="flex flex-col gap-6 min-h-screen items-center justify-center p-24">
      {children}
      <LightDarkToggle className="fixed right-0 top-1/2 rounded-full" />
    </main>
  );
}
