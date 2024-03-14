import { Pipe, PipeTransform } from "@angular/core";
// import { Pipe } from "rxjs";
import { LearningWay } from "../app/modules/Courses/course.model";

@Pipe({
    name:"IconPipe"
})
export class IconPipe implements PipeTransform{

    transform(value: any) {
        if(value==LearningWay.Zoom)
            return "\\assets\\option-learning/1.png"
        if(value==LearningWay.Frontal)
            return "\\assets\\option-learning/0.png"
        return ""
    }
}
