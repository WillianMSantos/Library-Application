import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { MainComponent } from './common/main/main.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'author' },
      { 
        path: 'author', 
        loadChildren: () => import('./common/api/author/author.module').then(m => m.AuthorModule) 
      },
      { 
        path: 'book', 
        loadChildren: () => import('./common/api/book/book.module').then(m => m.BookModule) 
      },
      { 
        path: 'student', 
        loadChildren: () => import('./common/api/student/student.module').then(m => m.StudentModule) 
      },
      { 
        path: 'user', 
        loadChildren: () => import('./common/api/user-detail/user.module').then(m => m.UserModule) 
      },
    ]
  },
  //{path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


