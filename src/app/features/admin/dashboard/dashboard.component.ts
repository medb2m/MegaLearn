import { Component } from '@angular/core';
import { Chart, registerables, LinearScale, CategoryScale, BarElement, BarController} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  earningsMonthly: string = '$40';
  earningsAnnual: string = '$215,000';
  tasksCompletion: number = 50;
  pendingRequests: number = 18;

  constructor() {
    // Registering necessary components for the bar chart
    Chart.register(...registerables, LinearScale, CategoryScale, BarElement, BarController);
  }

ngOnInit(){
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}
}