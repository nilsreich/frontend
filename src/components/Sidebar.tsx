import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TableOfContentsIcon } from 'lucide-react';

const navItems = [
  { text: "GrundlagenI" },
  { text: "GrundlagenII" },
  { text: "Terme" },
  { text: "Gleichungen" },
];

export const Sidebar = () => {
  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-2 right-0 flex justify-end">
        <Sheet>
          <SheetTrigger className="p-4 flex items-center z-50 ">
            <TableOfContentsIcon size={24} />
          </SheetTrigger>
          <SheetContent side="top" className="bg-slate-50">
            
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a key={index} href={`/${item.text}`} className="text-lg hover:text-blue-600">
                  {item.text}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-80 p-4  sticky top-0 h-screen overflow-y-auto">
        <nav className="flex flex-col space-y-4">
          {navItems.map((item, index) => (
            <a key={index} href={`/${item.text}`} className="text-lg hover:text-blue-600">
              {item.text}
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}