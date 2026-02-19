import { Routes } from '@angular/router'; 


import { AboutComponent } from './about/about';

import { Projects } from './projects/projects';
import { Experience } from './experience/experience';
import { Contact } from './contact/contact';
import { Home } from './home/home';
import { Education } from './education/education';

import { Login } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard'; 

import { Personalinfo } from './personalinfo/personalinfo';
import { Manageprojects } from './manageprojects/manageprojects';
import { Managesociallinks } from './managesociallinks/managesociallinks';

import { Manageexperiences } from './manageexperiences/manageexperiences';
 

import { AdminMessages } from './adminmessages/adminmessages';
import { authGuard } from './auth/auth.guard';
 
 
export const routes: Routes = [
   { path: 'home', component: Home },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: Projects },
  { path: 'experience', component: Experience },
  { path: 'contact', component: Contact },
  { path: 'education', component: Education },

  // 2. Auth Routes
  { 
    path: 'login', 
    component: Login,
    title: 'Admin Login' 
  },
 
  // 3. Protected Routes
  { 
    path: 'dashboard', 
    component: Dashboard, 
    canActivate: [authGuard], 
    children: [
      { path: 'profile', component: Personalinfo }, 
       { path: 'manageprojects', component: Manageprojects  }, 
       { path: 'socials', component: Managesociallinks },  
       { path: 'experience', component: Manageexperiences }, 
       { path: 'messages', component: AdminMessages }, 
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ],
    title: 'Admin Dashboard'
  },
 
  // 4. Default Redirect (Root)
  { 
    path: '', 
    redirectTo: 'home', // Usually you want home to be the default for visitors
    pathMatch: 'full' 
  },

  // 5. Wildcard (MUST BE LAST)
  // If the user types a URL that doesn't exist, send them to login or home
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];
