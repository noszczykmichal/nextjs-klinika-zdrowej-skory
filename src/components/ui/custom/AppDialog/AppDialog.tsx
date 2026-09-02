import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import OutlineButton from "@/components/ui/custom/OutlineButton/OutlineButton";

interface AppDialogProps {
  children: React.ReactNode;
  isTriggerVisible?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AppDialog({
  children,
  isTriggerVisible,
  open,
  onOpenChange,
}: AppDialogProps) {
  const formOpenHander = () => {
    onOpenChange(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {isTriggerVisible && (
          <OutlineButton onClick={formOpenHander}>
            Zapisz się na szkolenie
          </OutlineButton>
        )}
      </DialogTrigger>

      <DialogContent
        overlayClassName="backdrop-blur-md bg-transparent"
        className="md:3/4 w-[95vw] !max-w-3xl border border-gray-500 md:w-3/4"
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
