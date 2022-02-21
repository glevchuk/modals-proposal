import React, { useState } from 'react'
import { ModalsRoot } from 'app/modals-root'
import { modalsModel } from 'shared/lib/modals'
import { DeleteProjectModal } from 'modals/delete-project'

function App() {
    const [newProjectCategory, setNewProjectCategory] = useState('category')
    const [nameOfProjectToDelete, setNameOfProjectToDelete] =
        useState('project name')

    const handleNewProjectCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNewProjectCategory(event.target.value)
    }

    const handleNameOfProjectToDeleteChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNameOfProjectToDelete(event.target.value)
    }

    const openCreateProjectModal = () => {
        modalsModel.push({
            name: 'CREATE_PROJECT_MODAL',
            props: {
                category: newProjectCategory,
            },
        })
    }
    // or
    const openDeleteProjectModal = () => {
        modalsModel.push({
            name: DeleteProjectModal.name,
            props: {
                name: nameOfProjectToDelete,
                id: 1,
            },
        })
    }

    const closeAllModals = () => {
        modalsModel.clear()
    }

    const replaceLastWithCreateProjectModal = () => {
        modalsModel.replaceLast({
            name: 'CREATE_PROJECT_MODAL',
            props: {
                category: newProjectCategory,
            },
        })
    }

    const replaceAllWithDeleteProjectModal = () => {
        modalsModel.replaceAll({
            name: 'DELETE_PROJECT_MODAL',
            props: {
                name: nameOfProjectToDelete,
                id: 1,
            },
        })
    }

    return (
        <div className="App">
            <div
                style={{
                    display: 'flex',
                    columnGap: '20px',
                    marginBottom: 30,
                }}
            >
                <label>
                    <p>New Project Category</p>
                    <input
                        value={newProjectCategory}
                        onChange={handleNewProjectCategoryChange}
                        type="text"
                    />
                </label>
                <label>
                    <p>Name of project to delete</p>
                    <input
                        value={nameOfProjectToDelete}
                        onChange={handleNameOfProjectToDeleteChange}
                        type="text"
                    />
                </label>
            </div>

            <div
                style={{ display: 'flex', columnGap: '10px', marginBottom: 40 }}
            >
                <button onClick={openCreateProjectModal}>
                    Open CreateProjectModal
                </button>

                <button onClick={openDeleteProjectModal}>
                    Open DeleteProjectModal
                </button>

                <button onClick={closeAllModals}>Close all modals</button>

                <button onClick={replaceLastWithCreateProjectModal}>
                    Replace Last With Create project modal
                </button>

                <button onClick={replaceAllWithDeleteProjectModal}>
                    Replace all with DeleteProjectModal
                </button>
            </div>

            <h1>Opened modals:</h1>

            <ModalsRoot />
        </div>
    )
}

export default App
