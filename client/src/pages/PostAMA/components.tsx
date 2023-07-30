import { styled } from 'styled-components'

type ChildrenPropsT = {
    children: React.ReactNode
}

const CategoriesContainerC = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    gap: 25px;
`
export const CategoriesContainer: React.FC<ChildrenPropsT> = ({
    children,
}: ChildrenPropsT) => {
    return <CategoriesContainerC>{children}</CategoriesContainerC>
}

const CategoryContainerC = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 100%;
    padding: 1rem;

    &:hover {
        cursor: pointer;
    }
`
type CatContainerType = {
    children: React.ReactNode
}
export const CategoryContainer: React.FC<CatContainerType> = ({
    children,
}: CatContainerType) => {
    return (
        <CategoryContainerC className="border-solid border-2 border-blue-400 rounded-lg">
            {children}
        </CategoryContainerC>
    )
}

type CTextPropsType = {
    text: string
}
export const CategoryText: React.FC<CTextPropsType> = ({
    text,
}: CTextPropsType) => {
    return <p>{text}</p>
}
