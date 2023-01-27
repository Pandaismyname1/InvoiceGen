export interface SpacingProps {
    height: number;
}

export const Spacing = (props: SpacingProps) => {
    return (
        <div className="w-full" style={{height: props.height}}/>
    );
};