import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {
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
        subtitle: {
          text: 'Users signed up so far'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total percent market share'
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
