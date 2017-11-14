/**
 * Определяет базовые аргументы поиска - пол, возраст и праздник
 */
export class Tags{
    constructor(public ageFirst: number, public ageSecond: number, public celebration: string, public gender: string, 
        public types: boolean[] = [false, false, false, false, false, false, false] )
    {

    }
}

