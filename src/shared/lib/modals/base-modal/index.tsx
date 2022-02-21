import React from 'react'
import styles from 'shared/lib/modals/base-modal/styles.module.scss'
import clsx from 'clsx'
import { modalsModel } from '..'

interface BaseModalProps {
    children?: React.ReactNode
    size?: 'small' | 'medium' | 'large'
}

export const BaseModal = ({ children, size = 'medium' }: BaseModalProps) => (
    <div
        className={clsx(styles.BaseModal, {
            [styles.BaseModal_Size_Small]: size === 'small',
            [styles.BaseModal_Size_Medium]: size === 'medium',
            [styles.BaseModal_Size_Large]: size === 'large',
        })}
    >
        <button
            onClick={() => modalsModel.pop()}
            className={styles.BaseModal_CloseButton}
        >
            x
        </button>

        <React.Suspense fallback={<div>loading</div>}>
            {children}
        </React.Suspense>
    </div>
)
