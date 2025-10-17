"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BannerWithButtonProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  buttonPosition?: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

const BannerWithButton = ({
  src,
  alt,
  sizes = "100vw",
  className = "h-auto w-full rounded-3xl",
  priority = false,
  buttonPosition = {
    top: "70%",
    left: "50%",
    width: "120px",
    height: "40px",
  },
}: BannerWithButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Verifica se a classe contém "fill" ou "object-cover" para determinar o tipo de imagem
  const isFillImage =
    className.includes("fill") || className.includes("object-cover");

  return (
    <div className="relative">
      {isFillImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={className}
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          height={0}
          width={0}
          sizes={sizes}
          className={className}
          priority={priority}
        />
      )}

      {/* Link flutuante sobre o botão */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="focus:ring-primary absolute -translate-x-1/2 -translate-y-1/2 transform rounded-lg transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        style={{
          top: buttonPosition.top,
          left: buttonPosition.left,
          width: buttonPosition.width,
          height: buttonPosition.height,
        }}
        aria-label="Comprar produto"
      />

      {/* Dialog/Popup */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Produto Fora de Estoque
            </DialogTitle>
            <DialogDescription className="text-center">
              Este produto não está disponível no momento.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BannerWithButton;
