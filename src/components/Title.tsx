export function Title(props: { title: string }) {
    return (
        <div className="text-xl mb-6 lg:pl-12">
            <strong>{ props.title }</strong>
        </div>
    );
}