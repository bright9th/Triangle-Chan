import { useEffect, useRef, useState } from "react";

// ^(?=\d*$)(?:\d*(?:69|96|60*9|90*6)(?:0*)$)
const REGEX = /^\d*30*$/;

const Layout = () => {
  const [count, setCount] = useState(0);
  const [popups, setPopups] = useState<{ id: number; text: string }[]>([]);
  const nextPopupId = useRef(0);

  const templateAudios = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    templateAudios.current = [
      // トライ・アングルです。
      "/assets/torai-anguru-1.wav",
      // 三角こんにちは！
      "/assets/torai-anguru-2.wav",
    ].map((path) => new Audio(import.meta.env.BASE_URL + path));
    templateAudios.current.forEach((audio) => audio.load());

    setPopups([
      {
        id: -2,
        text: "Everytime a digit turns 3",
      },
      {
        id: -1,
        text: "Anguru-san will say something",
      },
    ]);
  }, []);

  useEffect(() => {
    if (!REGEX.test(count.toString())) return;

    const templates = templateAudios.current;
    const index = Math.floor(Math.random() * templates.length);

    // Play sound
    if (templates.length > 0) {
      const template = templates[index];
      const audio = template.cloneNode(true) as HTMLAudioElement;
      audio.play().catch(() => {});
    }

    if (nextPopupId.current == 0) {
      setPopups([]);
    }

    // Show popup for 3 seconds.
    const id = nextPopupId.current++;

    setPopups((p) => [
      ...p,
      {
        id,
        text: ["I am Torai Anguru!", "Hello Trianglings!"][index],
      },
    ]);

    window.setTimeout(() => {
      setPopups((p) => p.filter((x) => x.id !== id));
    }, 3000);
  }, [count]);

  return (
    <div className="w-screen h-screen bg-white relative overflow-hidden text-black">
      {/* Background overlay */}
      <div
        className="absolute inset-0 opacity-30 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("https://i.imgur.com/7hnzIv8.png")',
        }}
      />

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
