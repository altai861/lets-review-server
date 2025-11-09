docker compose up -d
npx prisma migrate dev --name init
npx prisma generate