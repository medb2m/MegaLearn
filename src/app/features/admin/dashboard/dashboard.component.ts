import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { DashboardService } from '@app/_services/dashboard.service';
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
import { Chart, registerables, LinearScale, CategoryScale, BarElement, BarController} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
<<<<<<< HEAD
  earningsMonthly: string = '$40';
  earningsAnnual: string = '$215,000';
  tasksCompletion: number = 50;
  pendingRequests: number = 18;

  constructor() {
=======
 

  dashboardData: any;

  constructor(private dashboardService: DashboardService) {
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
    // Registering necessary components for the bar chart
    Chart.register(...registerables, LinearScale, CategoryScale, BarElement, BarController);
  }

ngOnInit(){
<<<<<<< HEAD
=======
  this.dashboardService.getDashboardData().subscribe(data => {
    this.dashboardData = data;
  });
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
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
<<<<<<< HEAD
=======


>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
}