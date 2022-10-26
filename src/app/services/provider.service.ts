import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  //declarer comme variable global dans environments/environment.ts
  //et on change le this dans les mothodes par environment aprés l'import
  //urlProviders = 'http://127.0.0.1:8080/providers';
  provider: any;


  constructor(private Http: HttpClient) { }

  listProviders() {
    //return this.Http.get(this.urlProviders + '/list');
    return this.Http.get(environment.urlProviders + '/list');
  }
  createProvider(myform:any) {
    this.provider = {
      'name': myform.value.providerName,
      'email': myform.value.providerEmail,
      'address': myform.value.providerAdress
    }
    return this.Http.post(environment.urlProviders + '/add', this.provider);
  }

  updateProvider(myObj:any) {
    return this.Http.put(environment.urlProviders + '/' + myObj['id'], myObj);
  }

  deleteProvider(myObj:any) {
    return this.Http.delete(environment.urlProviders + '/' + myObj['id'])
  }

  getProvider(id) {
    return this.Http.get(environment.urlProviders + '/' + id)
  }


}
