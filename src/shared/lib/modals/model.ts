import { createStore, createEvent, sample } from 'effector'
import { ActiveModal, NewModal } from './types'
import { v4 } from 'uuid'

export const $active = createStore<ActiveModal[]>([])

export const push = createEvent<NewModal>()

export const pop = createEvent()

export const clear = createEvent()

export const replaceLast = createEvent<NewModal>()

export const replaceAll = createEvent<NewModal>()

sample({
    // при срабатывании push
    clock: push,
    // взять данные из active
    source: $active,
    // вызвать fn с данными из active и push
    fn: (activeModals, newModal) => [
        ...activeModals,
        { ...newModal, id: newModal.id ?? v4() },
    ],
    // результат fn положить в active
    target: $active,
})

sample({
    clock: pop,
    source: $active,
    fn: (activeModals) => activeModals.slice(0, -1),
    target: $active,
})

sample({
    clock: clear,
    fn: () => [],
    target: $active,
})

sample({
    clock: replaceLast,
    source: $active,
    fn: (activeModals, newModal) => [
        ...activeModals.slice(0, -1),
        { ...newModal, id: newModal.id ?? v4() },
    ],
    target: $active,
})

sample({
    clock: replaceAll,
    fn: (newModal) => [{ ...newModal, id: newModal.id ?? v4() }],
    target: $active,
})
