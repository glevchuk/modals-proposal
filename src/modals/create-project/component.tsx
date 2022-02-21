import React from 'react'

export interface CreateProjectModalProps {
    category: string
}

const Component = ({ category }: CreateProjectModalProps) => (
    <div>
        <h1>Создать проект в категории «{category}»</h1>
    </div>
)

export default Component
