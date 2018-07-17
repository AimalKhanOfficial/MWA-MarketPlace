import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  chart;
  customVerificationData;
  constructor(private http: HttpClient, private analyticsService: AnalyticsService) {
    //charts

    this.analyticsService.userVerificationsChart(this.http).subscribe(data => {
      this.chart = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: 'User Details'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total signed up users'
          }
        },
        legend: {
          enabled: false
        },
        tooltip: {
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        series: [
          {
            "data": data
          }
        ]
      });
    });
  }

  ngOnInit() {
  }


}
