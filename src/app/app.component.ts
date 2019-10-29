import { Component, OnInit, ViewChild } from "@angular/core";
import { ConnectionService } from "./connection.servic";
import { locationmodel } from "./location";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild("places", { static: true }) places: GooglePlaceDirective;

  options = {
    types: ["(cities)"]
  };

  value = "";
  locations: locationmodel[];
  searchValue: string = "";
  keyword = "Location";
  data = [];

  public placeholder: string = "Location";
  constructor(private CService: ConnectionService) {}

  ngOnInit() {
    this.CService.getLocations().subscribe((data: any) => {
      this.locations = data;
      console.log(this.data);
      for (let entry of this.locations) {
        this.data.push(entry.locationName);
      }
    });
  }
  onChange(value: any) {
    console.log(value.address_components[0].long_name);
  }

  onEnter() {
    // console.log(value)
    console.log(this.searchValue);
    this.value = this.searchValue;
    this.searchValue = "";
    this.CService.AddLocationdata(this.value).subscribe(() =>
      this.CService.getLocations().subscribe((data: any) => {
        this.locations = data;

        for (let entry of this.locations) {
          if (
            this.data.find(test => test === entry.locationName) === undefined
          ) {
            this.data.push(entry.locationName);
          }
        }
      })
    );
  }

  //
}
