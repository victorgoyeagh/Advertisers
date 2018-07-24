export class MiscUtil {
    
    static GetRandomNumberBetween(start, end):number {
        let rand = (Math.floor(Math.random() * end) + start);
        return rand;
    }

}