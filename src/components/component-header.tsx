export default function ComponentHeader(params: { title: string, subtitle: string }) {
    return (
        <div className="space-y-2">
            <h2 className="text-2xl font-bold">{params.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">
                {params.subtitle}
            </p>
        </div>
    )
}