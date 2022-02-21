import React from 'react'

export interface DeleteProjectModalProps {
    name: string
    id: number
}

const Component = ({ name, id }: DeleteProjectModalProps) => (
    <div>
        <h1>Удалить проект «{name}»?</h1>
        <button onClick={() => console.log(id)}>Да</button>
    </div>
)

export default Component
