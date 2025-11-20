import { Sheet, SheetContent, SheetTrigger } from '../ui/Sheet'
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from './Sidebar';

const Mobilenav = ({ open, setOpen }) => {
  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="text-lamateal text-[24px] px-2">
            <GiHamburgerMenu />
          </div>
        </SheetTrigger>
        <SheetContent className="bg-lamaWhite" side="left">
          <SideBar open={true} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Mobilenav;