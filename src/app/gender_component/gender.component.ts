import { Component } from '@angular/core';
import { Tags } from '../main_data_service/tags'
import {Router} from '@angular/router';

@Component({
selector: 'gender-comp',
templateUrl: 'gender.component.html',
styleUrls: ['gender.component.css'],
})

export class GenderComponent{ 

    //option
    public tags: Tags = new Tags(5,100,"N/A","Мужской"); //true = male  and  false = female
    public gender: boolean = true;   //for selected bale or female
    public options: string[] = ["without", "celebration_1", "celebration_2"]; //celebration options
    public genders: string [] = ["Мужской", "Женский"];  //genders options
    //option

    //assets path//
    public imageManSrc: string = "/assets/images/man.png";
    public imageGirlSrc: string = "/assets/images/girl.png";
    public imageGendersSrc: string = "/assets/images/genders.png";
    //assets path//

    name= "GenderComp";

    constructor(private router: Router){}

    changed()
    {
        this.gender = !this.gender;
        if(this.gender)
        {
            this.tags.gender = this.genders[0];
        }
        else
        {
            this.tags.gender = this.genders[1];
        }
        
    }

    to_offers(tags: Tags){ 
        this.router.navigate(
        ["/offers"],
        {
            queryParams:{
                'ageFirst': tags.ageFirst, 
                'ageSecond': tags.ageSecond, 
                'celebration': tags.celebration, 
                'gender': tags.gender
            }
        }
    
    );
}
    
}