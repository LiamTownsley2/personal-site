export type IndexHeaderParams = { title: string, subtitle: string }
export default function IndexHeader(params: IndexHeaderParams) {
    return (
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{params.title}</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {params.subtitle}
            </p>
        </div>
    )
}