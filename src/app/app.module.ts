import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { SkillsComponent } from './skills/skills.component';
import { EducationexperienceComponent } from './educationexperience/educationexperience.component';
import { BannerComponent } from './banner/banner.component';
import { ContactComponent } from './contact/contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { SmoothScrollToDirective, SmoothScrollDirective } from 'ng2-smooth-scroll';
import { Ng2ScrollableModule } from 'ng2-scrollable';

const googleMapKey = AgmCoreModule.forRoot({
  apiKey: 'AIzaSyD9KRgBgw0fikiVdzFpHQA0q1_2mn2KsSg'
});

const routes: Routes = [
  {path: '', component: AppComponent}
  //{path: 'aboutme', component: AboutmeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutmeComponent,
    SkillsComponent,
    EducationexperienceComponent,
    BannerComponent,
    ContactComponent,
    SmoothScrollToDirective,
    SmoothScrollDirective,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule,
    googleMapKey,
    RouterModule.forRoot(routes),
    Ng2ScrollableModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
