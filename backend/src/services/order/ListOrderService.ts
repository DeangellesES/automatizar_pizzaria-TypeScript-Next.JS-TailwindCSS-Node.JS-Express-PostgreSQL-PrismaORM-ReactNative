import prismaClient from "../../prisma";

interface ListOrdersServiceProps {
  draft?: string;
  user_id: string;
}

class ListOrdersService {
  async execute({ draft, user_id }: ListOrdersServiceProps) {
    const orders = await prismaClient.order.findMany({
      where: {
        draft: draft === "true" ? true : false,
        user_id: user_id,
      },
      select: {
        id: true,
        table: true,
        name: true,
        draft: true,
        status: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            amount: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
              },
            },
          },
        },
      },
    });

    return orders;
  }
}

export { ListOrdersService };
