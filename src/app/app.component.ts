import { Component, OnInit } from "@angular/core";
import { ConnectionService } from "./connection.servic";
import { locationmodel } from "./location";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
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

  onEnter(value: string) {
    if (value != "") {
      this.value = value;
      this.searchValue = null;
      this.CService.AddLocationdata(value).subscribe(() =>
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
    } else {
      alert("Please Enter Value");
    }
  }

  //
}
