import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with default users...');

  // Optional: clear out the old data before seeding to have a clean slate.
  // Warning: This causes data deletion
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@gauyog.com',
      password: hashedPassword,
      role: 'ADMIN',
      cart: {
        create: {},
      },
    },
  });

  // Normal User
  const normalUser = await prisma.user.create({
    data: {
      email: 'user@gauyog.com',
      password: hashedPassword,
      role: 'USER',
      cart: {
        create: {},
      },
    },
  });

  console.log(`[+] Admin User Created: ${adminUser.email} (password: password123)`);
  console.log(`[+] Normal User Created: ${normalUser.email} (password: password123)`);

  const products = [
    {
      name: "Cow Dung Powder",
      price: 499,
      discountPrice: 549,
      stock: 120,
      description: "Pure, finely milled powder from indigenous Gir cow dung — sun-dried and mechanically processed to preserve beneficial soil microbes.",
      ingredients: "100% sun-dried Gir cow dung, no additives, no fillers, no chemicals",
      category: "Garden",
      weight: "1KG",
      weightOptions: ["1KG", "2KG", "5KG", "10KG"],
      imageUrl: "https://images.unsplash.com/photo-1574226516831-e1dff420e3a9?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1585399122431-42673282433d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
      ],
      benefits: [
        "Supports soil fertility",
        "Promotes healthy plant growth",
        "Free grazing Gir cattle sourced",
      ],
      sku: "VE-CDP-1KG",
      batchNo: "See printed label",
      mfgDate: "2026-04-01",
      bestBefore: "18 months from mfg",
      usageInstructions: "Mix 200–500g per square metre into garden beds before planting. Combine with jaggery & water for homemade jeevamrut.",
      storageInstructions: "Store in a cool, dry location in sealed packaging. Moisture will activate microbial cultures prematurely.",
      safetyInstructions: "For agricultural use only — not for human consumption. Avoid inhaling fine powder and wash hands thoroughly after handling.",
    },
    { name: "Fresh Cow Milk", price: 60, stock: 100, description: "Daily | Dairy | 1kg | Sourced from high-quality grass-fed cows, our fresh milk is processed with zero additives." },
    { name: "A2 Desi Ghee", price: 850, stock: 50, description: "Premium | Ghee | 500g | Traditional Bilona-method ghee made from A2 cow milk." },
    { name: "Organic Butter", price: 210, stock: 60, description: "Fresh | Dairy | 250g | Pure, unsalted organic butter churned the traditional way." },
    { name: "Probiotic Curd", price: 45, stock: 80, description: "Healthy | Dairy | 500g | Thick, creamy curd set with natural cultures." },
    { name: "Natural Paneer", price: 150, stock: 40, description: "Handmade | Dairy | 250g | Soft, handmade cottage cheese with no preservatives." },
    { name: "Bio-Fertilizer", price: 320, stock: 200, description: "Eco | Garden | 1kg | Nutrient-rich organic fertilizer to help your home garden thrive naturally." },
    { name: "Organic Honey", price: 450, stock: 35, description: "Pure | Pantry | 250g | Raw, unprocessed forest honey collected by local tribes." },
  ];

  await prisma.product.deleteMany();
  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log(`[+] Seeded ${products.length} products`);
  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding blocked due to an error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
