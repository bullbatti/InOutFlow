
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { MyCompanyComponent } from './component/my-company/my-company.component';
import { Routes } from '@angular/router';
import { authGuard } from './service/auth.guard';
import { RowToggler } from 'primeng/table';
import { AccountType } from './account-type';

export const routes: Routes = [
    {
        path: "login",
        title: "InOutFlow - Login",
        component: LoginComponent,
    },
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "employee",
        title: "InOutFlow - Your Profile",
        canActivate: [authGuard],
        component: EmployeeComponent,
        children: [
            {
                path: "profile",
                title: "InOutFlow - My profile",
                canActivate: [authGuard],
                component: UserProfileComponent
            },
            {
                path: "my-company",
                title: "InOutFlow - My company",
                canActivate: [authGuard],
                component: MyCompanyComponent
            }
        ]
    },
    {
        path: "**",
        title: "InOutFlow - Page not Found",
        component: PageNotFoundComponent
    },
    
];
