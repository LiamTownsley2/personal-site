export default function PageHeading(params: { title: string, subtitle: string }) {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{params.title}</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    {params.subtitle}
                </p>
            </div>
        </div>
    )
}