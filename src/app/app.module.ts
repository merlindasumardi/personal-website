import { AngularFireStorageModule } from 'angularfire2/storage';
import { AppServiceService } from './app-service.service';
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
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutmeAdminComponent } from './admin/aboutme-admin/aboutme-admin.component';
import { SkillAdminComponent } from './admin/skill-admin/skill-admin.component';
import { EducationComponent } from './admin/education/education.component';
import { ExperienceComponent } from './admin/experience/experience.component';
import { AwardsComponent } from './awards/awards.component';
import { PortofolioAdminComponent } from './admin/portofolio-admin/portofolio-admin.component';
import { BlogAdminComponent } from './admin/blog-admin/blog-admin.component';
import { WorkComponent } from './work/work.component';
import { PortofolioComponent } from './portofolio/portofolio.component';
import { AwardsAdminComponent } from './admin/awards-admin/awards-admin.component';
import { LoginComponent } from './login/login.component';

const googleMapKey = AgmCoreModule.forRoot({
  apiKey: 'AIzaSyD9KRgBgw0fikiVdzFpHQA0q1_2mn2KsSg'
});

const routes: Routes = [
  { path: 'home', component: HeaderComponent },
  {path: 'admin', component: AdminComponent, children: [
    {path: 'aboutMe', component: AboutmeAdminComponent},
    {path: 'skill', component: SkillAdminComponent},
    {path: 'edu', component: EducationComponent},
    {path: 'exp', component: ExperienceComponent},
    {path: 'awards', component: AwardsAdminComponent},
    {path: 'portofolio', component: PortofolioAdminComponent}

  ]}
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
    AdminComponent,
    AboutmeAdminComponent,
    SkillAdminComponent,
    EducationComponent,
    ExperienceComponent,
    AwardsComponent,
    PortofolioAdminComponent,
    BlogAdminComponent,
    WorkComponent,
    PortofolioComponent,
    AwardsAdminComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    googleMapKey,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule
  ],
  providers: [AppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
