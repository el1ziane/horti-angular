import { Component, OnInit } from '@angular/core';
import { ChartModule,Chart } from 'angular-highcharts';
import { EstoqueService } from '../../../services/estoque.service';
import { ProdutosService } from '../../../services/produtos.service';

@Component({
  selector: 'app-alerta-estoque-dashboard',
  standalone: true,
  imports: [ ChartModule],
  templateUrl: './alerta-estoque-dashboard.component.html',
  styleUrl: './alerta-estoque-dashboard.component.css'
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
    this.estoqueService.list().subscribe(estoques => {
      this.produtosService.list().subscribe(produtos => {
        // Filtra apenas os produtos cujo estoque atual está abaixo do estoque ideal
        const filteredData = produtos.filter(produto => {
          const estoque = estoques.find(e => e.produtoEstoque?._id === produto._id);
          const quantidadeEstoque = estoque?.quantidadeEstoque || 0;
          const quantidadeIdeal = produto.quantidadeProduto || 0;
          return quantidadeEstoque < quantidadeIdeal; // Filtra onde o estoque está abaixo do ideal
        });

        // Mapeia os nomes dos produtos filtrados
        const categories = filteredData.map(produto => produto.produtoNome);

        // Mapeia os dados de estoque atual e ideal para os produtos filtrados
        const chartDataAtual = filteredData.map(produto => {
          const estoque = estoques.find(e => e.produtoEstoque?._id === produto._id);
          return estoque ? (estoque.quantidadeEstoque || 0) : 0;
        });

        const chartDataIdeal = filteredData.map(produto => produto.quantidadeProduto || 0);

        // Cria o gráfico somente com os produtos filtrados
        this.createChart(categories, chartDataAtual, chartDataIdeal);
      });
    });
  }

  createChart(categories: string[], chartDataAtual: number[], chartDataIdeal: number[]) {
    this.chart = new Chart({
      chart: {
        type: 'bar',
        height: 325
      },
      title: {
        text: 'Alerta de Estoque (Abaixo do Ideal)'
      },
      xAxis: {
        categories: categories // Exibindo os nomes dos produtos no eixo X
      },
      yAxis: {
        title: {
          text: 'Quantidade'
        }
      },
      series: [
        {
          name: 'Estoque Atual',
          type: 'bar',
          data: chartDataAtual, // Dados para estoque atual
          color: '#a3d8a7' // Cor pastel para estoque atual
        },
        {
          name: 'Estoque Ideal',
          type: 'bar',
          data: chartDataIdeal, // Dados para estoque ideal
          color: '#ffcc80' // Cor pastel para estoque ideal
        }
      ],
      plotOptions: {
        bar: {
          pointPadding: 0.2, // Corrigido: Dentro de plotOptions.bar
          groupPadding: 0.1   // Corrigido: Dentro de plotOptions.bar
        }
      },
      credits: {
        enabled: false
      }
    });
  }
}
