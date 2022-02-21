import React from 'react'
import { BaseModal } from 'shared/lib/modals/base-modal'
import { type DeleteProjectModalProps } from './component'

const Component = React.lazy(() => import('./component'))

const Modal = (props: DeleteProjectModalProps) => (
    <BaseModal>
        <Component {...props} />
    </BaseModal>
)

export const DeleteProjectModal = {
    name: 'DELETE_PROJECT_MODAL',
    Modal,
} as const
