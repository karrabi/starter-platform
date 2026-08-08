import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      gallery: true,
    },
  });

  for (const product of products) {
    if (!Array.isArray(product.gallery)) {
      continue;
    }

    const mediaIds = product.gallery.filter(
      (value): value is number => typeof value === "number",
    );

    for (let position = 0; position < mediaIds.length; position++) {
      const mediaId = mediaIds[position];

      const mediaExists = await prisma.media.findUnique({
        where: {
          id: mediaId,
        },
        select: {
          id: true,
        },
      });

      if (!mediaExists) {
        console.warn(`Media ${mediaId} not found for product ${product.id}`);
        continue;
      }

      await prisma.productMedia.upsert({
        where: {
          productId_mediaId: {
            productId: product.id,
            mediaId,
          },
        },
        update: {
          position,
          featured: position === 0,
        },
        create: {
          productId: product.id,
          mediaId,
          position,
          featured: position === 0,
        },
      });
    }
  }

  console.log("Product gallery migration completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
