import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {

  imageData:any;

  constructor(private activatedRoute: ActivatedRoute,
    private authService:AuthService) { }

  ngOnInit() {
  }

  getImageInfo(){
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getImageWID(id)
        .subscribe(data => this.imageData = data);
  }

}
