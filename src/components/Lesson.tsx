import { CheckCircle, Lock } from 'phosphor-react'
import {isPast, format} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';

interface LessonProps{
    title: string;
    slug: string;
    availableAT: Date;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps){
    const {slug} = useParams<{slug: string}>()

    const isLessonAvaialable = isPast(props.availableAT)
    const availableDateFormatted = format(props.availableAT, "EEEE' • 'd' de 'MMMM' • 'k'h'mm",{
        locale: ptBR,
    })

    const isActiveLesson = slug == props.slug;

    return(
        <Link to={`/event/lesson/${props.slug}`} className='group'>
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>

            <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson? 'bg-green-500' : ''}`}>
                <header className="flex items-center justify-between">
                    {isLessonAvaialable ? (
                        <span className={`text-sm text-blue-500 font-medium flex items-center gap-2 ${isActiveLesson? 'text-white': ''}`}>
                            <CheckCircle size={20}/>
                            Conteúdo Liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20}/>
                            Em breve
                        </span>
                    )}
                    <span className="text-xs rounded px-2 py-[2px] text-white border border-green-300 font-bold">
                        {props.type == 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong className={`mt-5 block ${isActiveLesson? 'text-white' : 'text-gray-200'}`}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}