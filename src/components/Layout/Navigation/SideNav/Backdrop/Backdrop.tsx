/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
      className={`xs:w-[40vw] fixed inset-0 z-[10] h-[100vh] w-[20vw] bg-transparent sm:w-[50vw] ${attached}`}
      onClick={handler}
    />
  );
}

export default Backdrop;
