import { useEffect, useRef, useState } from "react";

// ^(?=\d*$)(?:\d*(?:69|96|60*9|90*6)(?:0*)$)
const REGEX = /^\d*30*$/;

const Layout = () => {
  const [count, setCount] = useState(0);
  const [popups, setPopups] = useState<{ id: number; text: string }[]>([]);
  const nextPopupId = useRef(0);

  const audioTemplate = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioTemplate.current = new Audio(
      import.meta.env.BASE_URL + "/assets/torai-anguru.wav",
    );
    audioTemplate.current.load();

    setPopups([
      {
        id: -2,
        text: "Everytime a digit turns 3",
      },
      {
        id: -1,
        text: "Anguru-san will introduce herself",
      },
    ]);
  }, []);

  useEffect(() => {
    if (!REGEX.test(count.toString())) return;

    // Play sound: こんにちは！トライ・アングルです。
    const audio = audioTemplate.current?.cloneNode(true) as HTMLAudioElement;
    audio.play().catch(() => {});

    if (nextPopupId.current == 0) {
      setPopups([]);
    }

    // Show popup for 3 seconds.
    const id = nextPopupId.current++;

    setPopups((p) => [
      ...p,
      {
        id,
        text: "Hello! I am Torai Anguru!",
      },
    ]);

    window.setTimeout(() => {
      setPopups((p) => p.filter((x) => x.id !== id));
    }, 3000);
  }, [count]);

  return (
    <div className="w-screen h-screen bg-white relative overflow-hidden text-black">
      {/* Top text */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <h1 className="text-5xl font-bold select-none">{count}</h1>

        <div
          className="mt-2 flex flex-col items-center gap-1"
          style={{
            color: nextPopupId.current > 0 ? "red" : undefined,
          }}
        >
          {popups.map((popup) => (
            <div key={popup.id} className="text-xl font-medium select-none">
              {popup.text}
            </div>
          ))}
        </div>
      </div>

      {/* Triangle */}
      <div className="w-full h-full flex items-center justify-center">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="cursor-pointer active:scale-95 transition-transform"
          aria-label="Triangle"
        >
          <div
            className="animate-spin w-0 h-0
              border-l-[64px] border-r-[64px] border-b-[110px]
              border-l-transparent border-r-transparent border-b-[#FF0000]"
            style={{ animationDuration: "8s" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Layout;
