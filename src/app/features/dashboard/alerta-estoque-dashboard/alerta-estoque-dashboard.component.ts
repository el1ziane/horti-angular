import { Component, OnInit } from '@angular/core';
import { ChartModule, Chart } from 'angular-highcharts';
import { EstoqueService } from '../../../services/estoque.service';
import { ProdutosService } from '../../../services/produtos.service';

@Component({
  selector: 'app-alerta-estoque-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './alerta-estoque-dashboard.component.html',
  styleUrl: './alerta-estoque-dashboard.component.scss',
})
export class AlertaEstoqueDashboardComponent implements OnInit {
  chart!: Chart;

  constructor(
    private estoqueService: EstoqueService,
    private produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    this.loadEstoqueData();
  }

  loadEstoqueData() {
    this.estoqueService.list().subscribe((estoques) => {
      this.produtosService.list().subscribe((produtos) => {
        const filteredData = produtos.filter((produto) => {
          const estoque = estoques.find(
            (e) => e.produtoEstoque?._id === produto._id
          );
          const quantidadeEstoque = estoque?.quantidadeEstoque || 0;
          const quantidadeIdeal = produto.quantidadeProduto || 0;
          return quantidadeEstoque < quantidadeIdeal;
        });

        const categories = filteredData.map((produto) => produto.produtoNome);
        const chartDataAtual = filteredData.map((produto) => {
          const estoque = estoques.find(
            (e) => e.produtoEstoque?._id === produto._id
          );
          return estoque ? estoque.quantidadeEstoque || 0 : 0;
        });

        const chartDataIdeal = filteredData.map(
          (produto) => produto.quantidadeProduto || 0
        );

        this.createChart(categories, chartDataAtual, chartDataIdeal);
      });
    });
  }

  createChart(
    categories: string[],
    chartDataAtual: number[],
    chartDataIdeal: number[]
  ) {
    this.chart = new Chart({
      chart: {
        type: 'bar',
        height: 325,
      },
      title: {
        text: 'Alerta de Estoque (Abaixo do Ideal)',
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        title: {
          text: 'Quantidade',
        },
      },
      series: [
        {
          name: 'Estoque Atual',
          type: 'bar',
          data: chartDataAtual,
          color: '#a3d8a7',
        },
        {
          name: 'Estoque Ideal',
          type: 'bar',
          data: chartDataIdeal,
          color: '#ffcc80',
        },
      ],
      plotOptions: {
        bar: {
          pointPadding: 0.2,
          groupPadding: 0.1,
        },
      },
      credits: {
        enabled: false,
      },
    });
  }
}
