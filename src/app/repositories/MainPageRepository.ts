import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class MainPageRepository {

	constructor(private http: Http) {

	}

	getData(): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let requestOptions = new RequestOptions({headers: headers });

		return this.http.get(`assets/event.json`, requestOptions)
						.map(res => {
							let result = JSON.parse(res.text());
							console.log(result);
							return result;
						})
	}
}
