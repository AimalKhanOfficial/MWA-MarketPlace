import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  userVerificationsChart(http) {
    return http.get("http://localhost:3000/analytics//userVerificationsChart");
  }
}
