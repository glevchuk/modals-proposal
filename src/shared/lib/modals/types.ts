import { collection } from './collection'

type Collection = typeof collection

type MappedNew = {
    [Property in keyof Collection]: {
        name: Property
        props: Parameters<Collection[Property]>[0]
        id?: string
    }
}

export type NewModal = MappedNew[keyof MappedNew]

type MappedActive = {
    [Property in keyof Collection]: {
        name: Property
        props: Parameters<Collection[Property]>[0]
        id: string
    }
}

export type ActiveModal = MappedActive[keyof MappedActive]
