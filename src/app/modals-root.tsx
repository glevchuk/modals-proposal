import React from 'react'
import { useStore } from 'effector-react'
import { modalsModel, modalsCollection } from 'shared/lib/modals'

export const ModalsRoot = () => {
    const $activeModals = useStore(modalsModel.$active)

    return (
        <>
            {$activeModals.map((activeModal, index, { length }) => {
                const Modal = modalsCollection[activeModal.name]
                const isLast = index === length - 1 ? 1 : 0

                return (
                    <div
                        key={activeModal.id}
                        style={{
                            opacity: isLast ? 1 : 0.5,
                            pointerEvents: isLast ? 'auto' : 'none',
                        }}
                    >
                        {/* @ts-ignore TODO пока не знаю как сматчить типы */}
                        <Modal {...activeModal.props} />
                    </div>
                )
            })}
        </>
    )
}
