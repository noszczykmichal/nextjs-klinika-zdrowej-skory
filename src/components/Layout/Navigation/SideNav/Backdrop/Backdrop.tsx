import useMobileNav from "@/hooks/useMobileNav";

function Backdrop() {
  const { onClickHandler: onBackdropClick } = useMobileNav();

  return (
    <div
      className="fixed inset-0 h-[100vh] w-[50vw] bg-transparent z-[15]"
      onClick={onBackdropClick}
    />
  );
}

export default Backdrop;
