import prismaClient from "../../prisma/index";

interface RemoveItemProps {
  item_id: string;
  user_id: string;
}

class RemoveItemOrderService {
  async execute({ item_id, user_id }: RemoveItemProps) {
    try {
      // Verificar se o item existe
      const itemExists = await prismaClient.item.findFirst({
        where: {
          id: item_id,
          order: {
            user_id: user_id,
          },
        },
      });

      if (!itemExists) {
        throw new Error("Item não encontrado");
      }

      // Deletar o item
      await prismaClient.item.deleteMany({
        where: {
          id: item_id,
          order: {
            user_id: user_id,
          },
        },
      });

      return { message: "Item removido com sucesso" };
    } catch (err) {
      console.log(err);
      throw new Error("Falha ao remover item do pedido");
    }
  }
}

export { RemoveItemOrderService };
