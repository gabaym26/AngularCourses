export enum LearningWay { Frontal, Zoom }
export class Course {
    id?: number;
    name?: string;
    categoryId?: number;
    lessonsAmount?: number;
    startDate?: Date;
    courseSyllabus?: string[];
    learningWay?:LearningWay;
    lecturerId?:number;
    image?:string;
    constructor(){

    }

}