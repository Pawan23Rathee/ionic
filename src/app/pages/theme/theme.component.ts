import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit {

  constructor(public user: UserService) { 
    this.user.r_select_type=localStorage.getItem('r_select_type');
  }

  ngOnInit() {}

}
