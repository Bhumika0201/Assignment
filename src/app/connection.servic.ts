import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ConnectionService {
  //uri = " https://rocky-tundra-90487.herokuapp.com/add/";    //--node backend

  uri = "https://young-castle-75229.herokuapp.com/location/"

  constructor(private http: HttpClient) {}

  AddLocationdata(locationInfo) {
    console.log(locationInfo);
    const obj = {
      locationName: locationInfo //change locationName to location for node back-end
    };
    console.log(obj);
    return this.http.post(`${this.uri}addCity`, obj);
  }

  getLocations() {
    return this.http.get(`${this.uri}list`);
  }
}
