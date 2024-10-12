import { Component } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { VendasService } from '../../../services/vendas.service';

@Component({
  selector: 'app-top-vendas-dashboard',
  standalone: true,
  imports: [ ChartModule],
  templateUrl: './top-vendas-dashboard.component.html',
  styleUrl: './top-vendas-dashboard.component.css'
})
export class TopVendasDashboardComponent {
  chart: Chart;



  constructor(private vendasService: VendasService) {
    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 325,
        animation: { duration: 1000 }
      },
      title: {
        text: 'Produtos mais vendidos'
      },
      series: [{
        type: 'pie',
        data: [] // Inicialmente vazio, vamos preencher isso depois
      }],
      credits: {
        enabled: false
      }
    });
  }

  ngOnInit(): void {
    this.vendasService.getProdutosMaisVendidos().subscribe(produtos => {
      const chartData = produtos.map(produto => ({
        name: produto.nome,
        y: produto.total,
        color: this.getRandomColor() // Você pode definir uma cor aleatória ou fixa aqui
      }));


      // Limpa a série anterior e adiciona a nova série com animação
      this.chart.removeSeries(0); // Remove a série existente
      this.chart.addSeries({
        type: 'pie',
        data: chartData
      }, true, true); // Adiciona a nova série e a atualiza


    });
  }

  // Função para gerar uma cor aleatória
  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

