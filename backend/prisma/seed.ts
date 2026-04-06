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
