"use client";

import { useState, useRef, KeyboardEvent } from "react";
import NavigationBar from "@/components/navigationBar";

export default function JoinRoom() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleEnterRoom = () => {
    const roomCode = code.join("");
    if (roomCode.length === 6) {
      console.log("Entering room with code:", roomCode);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <>
    <NavigationBar />
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-4">
      <div className="bg-[#D3D3D3] rounded-3xl p-16 shadow-lg max-w-2xl w-full">
        <div className="flex flex-col items-center space-y-12">
          <button className="bg-[#B0B0B0] hover:bg-[#A0A0A0] text-black text-3xl font-semibold px-20 py-6 rounded-3xl transition-colors duration-200">
            Join Room
          </button>

          <div className="flex gap-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-20 h-20 bg-[#6B6B6B] rounded-3xl text-center text-3xl font-bold text-white focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-200"
              />
            ))}
          </div>

          <button
            onClick={handleEnterRoom}
            disabled={!isCodeComplete}
            className={`px-16 py-4 rounded-3xl text-xl font-medium transition-all duration-200 ${
              isCodeComplete
                ? "bg-[#8B4049] hover:bg-[#6B3039] text-black cursor-pointer"
                : "bg-[#8B4049] text-black opacity-50 cursor-not-allowed"
            }`}
          >
            Enter Room
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
