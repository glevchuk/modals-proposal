import React from 'react'
import { BaseModal } from 'shared/lib/modals/base-modal'
import { type CreateProjectModalProps } from 'modals/create-project/component'

const Component = React.lazy(() => import('./component'))

const Modal = (props: CreateProjectModalProps) => (
    <BaseModal>
        <Component {...props} />
    </BaseModal>
)

export const CreateProjectModal = {
    name: 'CREATE_PROJECT_MODAL',
    Modal,
} as const
