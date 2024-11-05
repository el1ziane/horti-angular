import { Component } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { VendasService } from '../../../services/vendas.service';

@Component({
  selector: 'app-top-vendas-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './top-vendas-dashboard.component.html',
  styleUrl: './top-vendas-dashboard.component.scss',
})
export class TopVendasDashboardComponent {
  chart: Chart;

  constructor(private vendasService: VendasService) {
    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 325,
        animation: { duration: 1000 },
      },
      title: {
        text: 'Produtos mais vendidos',
      },
      series: [
        {
          type: 'pie',
          data: [],
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }

  ngOnInit(): void {
    this.vendasService.getProdutosMaisVendidos().subscribe((produtos) => {
      const chartData = produtos.map((produto) => ({
        name: produto.nome,
        y: produto.total,
        color: this.getRandomColor(),
      }));

      this.chart.removeSeries(0);
      this.chart.addSeries(
        {
          type: 'pie',
          data: chartData,
        },
        true,
        true
      );
    });
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
