import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'discovery',
        children: [
          { path: '', loadChildren: '../discovery/discovery.module#DiscoveryPageModule' },
        ]
      },
      {
        path: 'chat',
        children: [
          { path: '', loadChildren: '../chat/chat.module#ChatPageModule' },
        ]
      },
      {
        path: 'notification',
        children: [
          { path: '', loadChildren: '../notification/notification.module#NotificationPageModule' },
        ]
      },
      {
        path: 'more',
        children: [
          { path: '', loadChildren: '../more/more.module#MorePageModule' }
        ]
      },
      {
        path: 'home',
        children: [
          { path: '', loadChildren: '../home/home.module#HomePageModule' }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
