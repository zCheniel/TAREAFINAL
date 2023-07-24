import singleItem from "./SingleItem"

interface PaginationI {
	items: singleItem[]
	page: number
	size: number
	total: number
	pages: number
	next_page: number | null
	previous_page: number | null
}

export default PaginationI
