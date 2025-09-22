
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { DataService } from '../data.service';

interface BudgetItem {
  title: string;
  budget: number;
}

interface BudgetResponse {
  myBudget: BudgetItem[];
}

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
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19']
      }
    ],
    labels: [] as string[]
  };

  constructor(private data: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<BudgetResponse>('http://localhost:3000/budget')
      .subscribe({
        next: (res) => {
          if (!res || !Array.isArray(res.myBudget)) {
            console.error('Unexpected API response', res);
            return;
          }
          for (const item of res.myBudget) {
            this.dataSource.datasets[0].data.push(item.budget);
            this.dataSource.labels.push(item.title);
          }
          this.createChart();
        },
        error: (err) => console.error('API error', err)
      });
  }

  private createChart(): void {
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
    new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
    });
  }
}
