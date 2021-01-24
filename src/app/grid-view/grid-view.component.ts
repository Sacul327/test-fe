import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  images:any={};

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getToken();
    this.authService.getImages().subscribe((data:any)=>{
      this.images=data.pictures
      console.log(this.images);
    });
    
  }

}
