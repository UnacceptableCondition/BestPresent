import {Component, OnInit, OnDestroy} from '@angular/core';
import {Offer} from './../main_data_service/offer';
import {HttpService} from './../main_data_service/http.service';
import {Response} from '@angular/http';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { Tags } from '../main_data_service/tags'
import { Archetype } from '../main_data_service/archetype'

@Component({
selector: 'offers-comp',
templateUrl: 'offers.component.html',
styleUrls: ['offers.component.css'],
providers: [HttpService]
})

export class OffersComponent implements OnInit{

    name= "OffersComp";
    receivedOffer: Offer; // полученные с сервера предложения
    public state: boolean;
    public offer_id: number = 0;

    public archetypes: Array<Archetype> = [
        new Archetype("Musician", "/assets/images/archetype/music.png", false,0),
        new Archetype("Traveller", "/assets/images/archetype/traveller.png", false,1),
        new Archetype("Athlete", "/assets/images/archetype/athlete.png", false,2),
        new Archetype("Extreme", "/assets/images/archetype/extreme.png", false,3),
        new Archetype("Creative", "/assets/images/archetype/creative.png", false,4),
        new Archetype("Family", "/assets/images/archetype/family.png", false,5),
        new Archetype("Logician", "/assets/images/archetype/logician.png", false,6)
    ];


    public tags: Tags = new Tags(5,100,"no","Мужской"); //Базовые настройки поиска

    public options: string[] = ["Без повода", "celebration_1", "celebration_2"];
    public genders: string [] = ["Мужской", "Женский"];

    private routeSubscription: Subscription;
    private querySubscription: Subscription;


    constructor(private httpService: HttpService, private route: ActivatedRoute)
    {

    }


    /**
     *
     * оправляем даннные на сервер и полечаем предложения
     */
    submit(tags: Tags){
        this.httpService.get_offers_by_tags(tags)
                .subscribe((data) => {this.receivedOffer=data;});
    }


    /**
     *
     * получаем выборку предложений при инициализации компонента
     */
    ngOnInit(){
        this.offer_id = this.route.snapshot.params['id'];
        if(this.offer_id)
        {
            this.state = false;
            this.httpService.get_offer_by_id(this.offer_id)
            .subscribe((data) => {this.receivedOffer=data;});


        }
        else
        {
            this.state = true;
            this.querySubscription = this.route.queryParams.subscribe(
                (queryParam: any) => {
                    this.tags.ageFirst = queryParam['ageFirst'];
                    this.tags.ageSecond = queryParam['ageSecond'];
                    this.tags.celebration = queryParam['celebration'];
                    this.tags.gender = queryParam['gender'];
                }
            );
            this.submit(this.tags);
        }

    }



    /**
     *
     * ставим/снимаем выделение архетипа + оправляем данные на сервер
     * и получаем новую выборку предложений
     */
    archetypeClick(archetype: Archetype){
        archetype.selected = !archetype.selected;
        if (archetype.selected)
            {
                this.tags.types[archetype.type] = true;
            }
        else
            {
                this.tags.types[archetype.type] = false;
            }
        this.submit(this.tags);
    }






}
