import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GridViewComponent } from './grid-view/grid-view.component';
import { ImageDetailsComponent } from './image-details/image-details.component';


const routes: Routes = [
  { path: '', component: GridViewComponent, canActivate:[ AuthGuard ] },
  { path: 'image-details/:id', component: ImageDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
