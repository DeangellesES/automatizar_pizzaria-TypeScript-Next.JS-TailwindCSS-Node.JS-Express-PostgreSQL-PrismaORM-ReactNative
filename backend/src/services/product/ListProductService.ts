import prismaClient from "../../prisma/index";

interface ListProductServiceProps {
  disabled?: string;
  user_id: string;
}

class ListProductService {
  async execute({ disabled, user_id }: ListProductServiceProps) {
    try {
      const products = await prismaClient.product.findMany({
        where: {
          disabled: disabled === "true" ? true : false,
          user_id: user_id,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          disabled: true,
          category_id: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return products;
    } catch (err) {
      throw new Error("Falha ao buscar produtos");
    }
  }
}

export { ListProductService };
