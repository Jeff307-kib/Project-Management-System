//For Add and Edit
export interface ActionButtonProps {
    label: string,
    onClick: () => void,
}

export interface DeleteButtonProps {
    label: string,
    id: number
}

export interface EditButtonProps {
    label: string,
}

export type FilterType = "date" | "alphabet"

export type FilterProps = {
    onFilterChange: (value: FilterType) => void,
}