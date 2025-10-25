export default function Loader() {
  return (
    <div
      className="flex h-[50%] w-[50%] items-center justify-center"
      data-testid="loader"
    >
      <div className="relative inline-block h-40 w-40">
        <div className="animate-lds-ripple absolute rounded-full border-[4px] border-white bg-[var(--magenta-100)] opacity-100" />
        <div className="animate-lds-ripple absolute rounded-full border-[4px] border-white bg-[var(--magenta-100)] opacity-100 delay-[-500ms]" />
      </div>
    </div>
  );
}
