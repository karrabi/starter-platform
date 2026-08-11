import Image from "next/image";

import { getMediaUrl } from "@/lib/media";

import type { ProductMedia } from "@/types/product";

type Props = {
  media: ProductMedia[];
  productName: string;
};

export function ProductGallery({ media, productName }: Props) {
  if (media.length === 0) {
    return null;
  }

  const sortedMedia = [...media].sort((a, b) => a.position - b.position);

  const featured = sortedMedia.find((item) => item.featured) ?? sortedMedia[0];

  const featuredUrl = getMediaUrl(featured.media.path);

  if (!featuredUrl) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="relative aspect-square w-full max-w-xl overflow-hidden rounded-lg border bg-gray-50">
        <Image
          src={featuredUrl}
          alt={productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 576px"
          className="object-contain"
        />
      </div>

      {sortedMedia.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {sortedMedia.map((item) => {
            const url = getMediaUrl(item.media.path);

            if (!url) {
              return null;
            }

            return (
              <div
                key={item.id}
                className="relative aspect-square overflow-hidden rounded-md border bg-gray-50"
              >
                <Image
                  src={url}
                  alt={productName}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
