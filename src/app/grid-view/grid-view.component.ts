import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-grid-view",
  templateUrl: "./grid-view.component.html",
  styleUrls: ["./grid-view.component.scss"],
})
export class GridViewComponent implements OnInit {
  images: any;
  pages: number;
  currentPage: number = 25;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getToken();
    this.authService.getImages(this.currentPage).subscribe((data: any) => {
      this.images = data.pictures;
      this.pages = data.pageCount;
      console.log(this.images);
    });
  }

  nextPage() {
    var prevState=this.currentPage
    this.currentPage == this.pages ? this.currentPage : this.currentPage++;
    if (this.currentPage != prevState) {
      this.authService.getImages(this.currentPage).subscribe((data: any) => {
        this.images = data.pictures;
        this.pages = data.pageCount;
        console.log(this.images);
      });
    }
  }
  previousPage() {
    this.currentPage == 1 ? this.currentPage : this.currentPage--;
    if (this.currentPage == 1) {
      this.authService.getImages(1).subscribe((data: any) => {
        this.images = data.pictures;
        this.pages = data.pageCount;
        console.log(this.images);
      });
    } else {
      this.authService.getImages(this.currentPage).subscribe((data: any) => {
        this.images = data.pictures;
        this.pages = data.pageCount;
        console.log(this.images);
      });
    }
  }
}
