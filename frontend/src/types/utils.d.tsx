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

export type FilterType = "Date" | "Alphabet"

export type FilterProps = {
    filterType: string,
    onFilterChange: (value: FilterType) => void,
}