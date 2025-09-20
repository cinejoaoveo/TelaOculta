import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="https://i.ibb.co/hRR6bVmk/Tela-Oculta-Icon.png"
        alt="Loading..."
        width={96}
        height={96}
        className="w-24 h-24 animate-pulse object-contain"
      />
    </div>
  );
}