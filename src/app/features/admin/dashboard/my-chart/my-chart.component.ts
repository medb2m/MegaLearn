import { Component } from '@angular/core';
import { ChartComponent, ApexChart, ApexXAxis, ApexYAxis, ApexDataLabels, ApexFill, ApexMarkers, ApexGrid, ApexNonAxisChartSeries } from "ng-apexcharts";
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class myChartComponent {
  earningsMonthly: string = '$40';
  earningsAnnual: string = '$215,000';
  tasksCompletion: number = 50;
  pendingRequests: number = 18;

  constructor() {
  }

  ngOnInit(){
    this.initChart()
  }

  initChart(){
    const options = {
      series: [{
        name: "Sales ($)",
        data: [
          { x: "Jan", y: 1965 },
          { x: "Feb", y: 1895 },
          { x: "Mar", y: 2187 },
          { x: "Apr", y: 2365 },
          { x: "May", y: 1943 },
          { x: "Jun", y: 2265 },
          { x: "Jul", y: 2489 },
          { x: "Aug", y: 2561 },
          { x: "Sep", y: 3587 },
          { x: "Oct", y: 3354 },
          { x: "Nov", y: 3865 },
          { x: "Dec", y: 4321 }
        ]
      }],
      chart: {
        type: "area",
        toolbar: {
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        }
      },
      dataLabels: { enabled: false },
      grid: { borderColor: "transparent" },
      colors: ["var(--bs-primary)"],
      markers: { size: 0 },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.12,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        type: "category",
        labels: {
          style: {
            colors: Array(12).fill("#a1aab2")
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: Array(12).fill("#a1aab2")
          }
        }
      }
    };

    const chart = new ApexCharts(document.querySelector("#bsb-chart-1"), options);
    chart.render();
  }

}