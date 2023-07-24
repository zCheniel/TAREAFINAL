import ItemBasicStructure from "./Creation"

interface singleItem extends ItemBasicStructure {
	id: number
	created_at: string
	updated_at: string
}

export default singleItem
