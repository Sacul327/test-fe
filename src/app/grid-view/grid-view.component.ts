import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

export interface Details {
  author: string;
  camera: string;
  cropped_picture: string;
  full_picture: string;
  id: string;
  tags: string;
}

@Component({
  selector: "app-grid-view",
  templateUrl: "./grid-view.component.html",
  styleUrls: ["./grid-view.component.scss"],
})
export class GridViewComponent implements OnInit {
  images: any;
  pages: number;
  currentPage: number = 1;
  moreDetails: Details;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getToken().subscribe((data: any) => {
      localStorage.setItem("token", data.token);
      this.authService.getImages(this.currentPage).subscribe((data: any) => {
        this.images = data.pictures;
        this.pages = data.pageCount;
        console.log(this.images);
      });
    });
  }

  getImageById(id: any) {
    this.moreDetails=null
    this.authService.getImageWID(id).subscribe((data: any) => {
      this.moreDetails = <Details>data;
    });
  }

  onCloseModal(){
    this.moreDetails=null
  }

  nextPage() {
    var prevState = this.currentPage;
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
  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    window.alert('copied to clipboard');
  }
}
