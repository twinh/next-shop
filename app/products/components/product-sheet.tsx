'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "../types";
import Image from "next/image";

interface ProductSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | undefined;
  isLoading: boolean;
}

export function ProductSheet({ isOpen, onOpenChange, product, isLoading }: ProductSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[540px] overflow-y-auto p-6">
        {isLoading ? (
          <div className="space-y-4">
            <SheetHeader className="px-0">
              <SheetTitle className="text-xl font-bold">Loading Product Details</SheetTitle>
            </SheetHeader>
            
            <Skeleton className="aspect-square rounded-lg" />
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-1/4" />
              </div>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ) : product ? (
          <>
            <SheetHeader className="px-0">
              <SheetTitle className="text-xl font-bold">{product.title}</SheetTitle>
              <SheetClose/>
            </SheetHeader>
            
            <div className="space-y-4">
              <div className="relative w-full">
                <Carousel className="w-full">
                  <CarouselContent>
                    {product.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`${product.title} - Image ${index + 1}`}
                            className="object-cover w-full h-full"
                            width={800}
                            height={800}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${product.price}</span>
                  <span className="text-sm text-gray-600">{product.category.name}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed max-h-24 overflow-y-auto">
                  {product.description}
                </p>
                <button className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <SheetTitle className="text-xl font-bold">No product found</SheetTitle>
            <SheetDescription>Please try again</SheetDescription>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
