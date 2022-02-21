## Предложение по работе с модалками

### Базовая модалка
`src/shared/modals/base-modal/index.tsx`

Простой компонент, который отрисовывает содержимое. 
Может настраиваться пропсами для каждой модалки индивидуально,
но в идеале это парочка пропсов для внешнего вида – например её размерность.
Умеет отображать фоллбэк для лениво загружаемого содержимого.

### Модалка в приложении
`src/modals/(create|delete)-project/index|component.tsx`

#### component.tsx

Тело модалки со своей логикой. Должно экспортироваться как `default`, если используем ленивую загрузку компонента.

#### index.tsx

В случае ленивой загрузки `component.tsx`, должен хранить в себе декларацию следующего вида:
```tsx
const Component = React.lazy(() => import('./component'))

const Modal = (props: CreateProjectModalProps) => (
    <BaseModal>
        <Component {...props} />
    </BaseModal>
)
```
Оборачивать вызов `<Component />` в `React.Suspense` нет необходимости,
так как за это отвечает `BaseModal`.

Если не лениво загружаем, то:
```tsx
import Component from './component'

const Modal = (props: CreateProjectModalProps) => (
    <BaseModal>
        <Component {...props} />
    </BaseModal>
)
```

Здесь должно экспортироваться только объект следующего вида:

```tsx
export const CreateProjectModal = {
    name: 'CREATE_PROJECT_MODAL', // уникальное имя модалки
    Modal: Modal, // компонент модалки
}
```

### Коллекция (название самому не нравится) модалок 
`src/shared/lib/modals/collection.ts`

Объект состоящий из записей следующего вида:

```tsx
import { CreateProjectModal } from 'modals/create-project/index';
import { DeleteProjectModal } from 'modals/delete-project/index';

export const collection = {
    [CreateProjectModal.name]: CreateProjectModal.Modal,
    [DeleteProjectModal.name]: DeleteProjectModal.Modal,
    // ... etc
}
```


### Моделька модалок
`src/shared/lib/modals/model.ts`

Состоит из стора и эвентов.

Стор хранит в себе массив с записями следующего вида:
```ts
{
    // имя модалки
    name: 'UNIQ_MODAL_NAME',
    // её пропсы    
    props: {},
    // уникальный айдишник, который генерится автоматом при добавлении модалки в массив,
    // но можно задать кастомный
    id: 'a0536acb-cda2-48e9-9e28-c8cb0e7830c5'   
}
```

Чтобы открыть модалку, мы должна вызвать следующее:
```ts
modalsModel.push({
    /**
     * Уникальное название, можно так же импортить объект из модаки и
     * испльзовать так: 
     * import { CreateProjectModal } from 'src/modals/create-project'
     * {
     *     name: CreateProjectModal.name,
     * }
     */
    name: 'CREATE_PROJECT_MODAL'
    /**
     * Пропсы для модалки
     */
    props: { category: 'food' }
})
```

После этого она попадёт в стор.

С типизацией здесь проблем никаких нет, после того, как напишите имя, IDE вам будет подсказывать,
что нужно положить в пропсы.

### Рендеринг модалок
`src/app/modals-root.tsx`

Пробегаемся по стору с открытыми модалками (`[ name: 'UNIQ_NAME', props: {}]`), с помощью поля 
`name` достаём из `collection` необходимый компонент и рендерим его с переданными `props`.

### Другие эвенты для управления стором

- `pop` удаляет последнюю модалку из списка открытых модалок
- `replaceLast` заменяет последнюю открытую модалку на переданную
- `replaceAll` заменяет все модалки на переданную

Список без проблем и боли может расширяться.

## Пример
Склоньте репу, установите зависимости и запустите с помощью `npm run dev`. 
То, что отображается в браузере можно найти в `src/app/index.tsx`

## Итог

Поверх этого мы сможем реализовать любую функциональность, которая нам будет необходима – отслеживание
открытия или закрыти] нужной нам модалки, логирование, открытие нескольких модалок и всё, что придёт
нам в голову и будет необходимо.

Я очень надеюсь на вашу обратную связь.