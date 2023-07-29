import { styled } from 'styled-components'

export const FlexContainer = styled.div`
    padding: 2rem 2rem;
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: center;
`

export const HalfContainer = styled(FlexContainer)`
    width: 50%;
`

export const PageContainer = styled.div`
    margin: 0;
    padding: 0;
`

export const HeaderContainer = styled.div`
    padding: 2rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const BodyContainer = styled.div`
    display: flex;
    justify-content: center;
`

type ProviderHolderTypes = {
    text: string
    onClick: React.MouseEventHandler
}
export const ProviderHolder: React.FC<ProviderHolderTypes> = ({
    text,
    onClick,
}) => {
    return (
        <div
            className="h-fit w-fit p-2 m-2 bg-red-300 hover:bg-red-400 border border-red-500"
            onClick={onClick}
        >
            {text}
        </div>
    )
}
