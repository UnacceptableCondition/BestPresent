import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {Offer} from './offer';
import {Observable} from 'rxjs/Observable';
import { Tags } from '../main_data_service/tags'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
 
@Injectable()
export class HttpService{
 

    
    constructor(private http: Http){ }  
    get_offers_by_tags(obj: Tags){
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('http://localhost/', body, { headers: headers })
            .map((resp:Response)=>resp.json())
            .catch((error:any) =>{return Observable.throw(error);}); 
        }

    get_offer_by_id(id: number)
    {
        return this.http.get('http://localhost/?id=' + id)
                                .map((resp:Response)=>resp.json())
                                .catch((error:any) =>{return Observable.throw(error);});
    }

    
    
}
