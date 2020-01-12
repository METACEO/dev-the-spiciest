import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Message } from '@dev-the-spiciest/api-interfaces';

@Component({
  selector: 'dev-the-spiciest-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
