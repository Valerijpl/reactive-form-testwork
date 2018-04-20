import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MainPageRepository } from '../repositories/MainPageRepository';

@Injectable()
export class MainPageResolver implements Resolve<Observable<any>> {
    constructor(private repository: MainPageRepository, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return this.repository.getData();
    }
}
