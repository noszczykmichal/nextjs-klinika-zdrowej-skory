import useMobileNav from "@/hooks/useMobileNav";

interface BackdropProps {
  onClick: () => void;
}

function Backdrop({ onClick }: BackdropProps) {
  const { onClickHandler: onBackdropClick, isMenuOpen } = useMobileNav();

  const handler = () => {
    onClick();
    onBackdropClick();
  };

  const attached = isMenuOpen ? "backdrop-blur-md" : "";

  return (
    <div
      className={`h-[100vh] w-[40vw] sm:w-[60vw] fixed inset-0  bg-transparent z-[10] ${attached}`}
      onClick={handler}
    />
  );
}

export default Backdrop;
