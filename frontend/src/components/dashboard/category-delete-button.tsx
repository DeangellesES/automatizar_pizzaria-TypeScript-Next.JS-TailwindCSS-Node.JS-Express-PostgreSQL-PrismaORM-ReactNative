"use client"

import { deleteCategoryAction } from "@/actions/categories"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface CategoryDeleteButtonProps {
    categoryId: string
    categoryName: string
}

export function CategoryDeleteButton({
    categoryId,
    categoryName,
}: CategoryDeleteButtonProps) {
    const router = useRouter()
    const [pending, setPending] = useState(false)

    async function handleDelete() {
        const message = `Excluir a categoria "${categoryName}"?\n\nSe houver produtos nela, eles também serão removidos (exclusão em cascata).`
        if (!confirm(message)) return

        setPending(true)
        try {
            const result = await deleteCategoryAction(categoryId)
            if (result.success) {
                router.refresh()
            } else if (result.error) {
                alert(result.error)
            }
        } finally {
            setPending(false)
        }
    }

    return (
        <Button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            variant="destructive"
            size="sm"
            className="gap-2"
            aria-label={`Excluir categoria ${categoryName}`}
        >
            <Trash2 className="h-4 w-4 shrink-0" />
            Excluir
        </Button>
    )
}
