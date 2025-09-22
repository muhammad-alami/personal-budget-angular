import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

type BudgetItem = { title: string; budget: number };
type ApiResponse = { data: { myBudget: BudgetItem[] } };

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
            datasets: [
                {
                    data: [] as number[],
                    backgroundColor: [
                        '#ffdd56',
                        '#ff6384',
                        '#36a2eb',
                        '#fd6b19',
                    ],
                }
            ],
            labels: [] as string[],
        };


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {

      for (const item of res.data.myBudget) {
        this.dataSource.datasets[0].data.push(item.budget);
        this.dataSource.labels.push(item.title);
      }
      this.createChart();
    });
  }
  private createChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Canvas element with id "myChart" not found.');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('2D context not available on canvas.');
      return;
    }
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }

}
