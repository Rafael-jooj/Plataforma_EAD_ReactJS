import { gql, useQuery } from "@apollo/client";
import { Lesson } from "./Lesson";

const GET_LESSONS_QUERY = gql`
    query MyQuery {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
        id
        lessonType
        availableAt
        title
        slug
    }
    }
`

interface GetLessonsQueryResponse{
    lessons: {
        id:string
        title: string
        slug: string
        availableAt: string
        lessonType: 'live' | 'class'
    }[]
}

export function Sidebar(){

    const {data} = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY)
    console.log(data)

    return(
        <aside className="w-[348px] bg-neutral-800 p-6 border-l border-gray-600">
            <span className="font-bold text-2xl pb-6 mb-6 border-b gorder-gray-500 block">
                Cronograma de aulas
            </span>

            <div className="flex flex-col gap-8">
                {data?.lessons.map(lesson =>{
                    return(
                        <Lesson
                            key={lesson.id}
                            title={lesson.title}
                            slug={lesson.slug}
                            availableAT={new Date(lesson.availableAt)}
                            type={lesson.lessonType}
                        />
                    )
                })}
            </div>
        </aside>
    )
}