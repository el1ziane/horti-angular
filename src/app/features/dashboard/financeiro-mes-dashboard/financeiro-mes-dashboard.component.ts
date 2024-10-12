import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule, Chart } from 'angular-highcharts';
import { ProducaoService } from '../../../services/producao.service';
import { VendasService } from '../../../services/vendas.service';
import { Subscription, interval } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-financeiro-mes-dashboard',
  standalone: true,
  imports: [ ChartModule],
  templateUrl: './financeiro-mes-dashboard.component.html',
  styleUrl: './financeiro-mes-dashboard.component.css',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
})
export class FinanceiroMesDashboardComponent implements OnInit, OnDestroy {
  chart!: Chart;
  updateInterval = 5000; // Atualizar a cada 5 segundos (pode ajustar)
  private subscription!: Subscription;

  constructor(
    private producaoService: ProducaoService,
    private vendasService: VendasService
  ) {}

  ngOnInit(): void {
    this.loadDataForChart();

    // Configurando a atualização automática
    this.subscription = interval(this.updateInterval).subscribe(() => {
      this.loadDataForChart(); // Recarregar os dados a cada intervalo definido
    });
  }

  ngOnDestroy(): void {
    // Cancelar a subscrição ao sair do componente
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadDataForChart() {
    // Buscando dados de produção
    this.producaoService.list().subscribe(producoes => {
      // Buscando dados de vendas
      this.vendasService.list().subscribe(vendas => {
        const categories = [
          'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];

        const groupByMonth = (items: any[], getDateFunc: (item: any) => string, getQuantityFunc: (item: any) => number | null) => {
          const grouped = new Array(12).fill(0);
          items.forEach(item => {
            const rawDate = getDateFunc(item); // data original
            // Conversão da data para o formato 'YYYY-MM-DD'
            const [day, month, year] = rawDate.split('-');
            const formattedDate = `${year}-${month}-${day}`;
            const date = new Date(formattedDate);
            const monthIndex = date.getMonth(); // Obtém o mês (0 = Janeiro, 11 = Dezembro)
            grouped[monthIndex] += getQuantityFunc(item) || 0; // Soma a quantidade do mês
          });
          return grouped;
        };

        // Agrupar produções por mês
        const producaoPorMes = groupByMonth(producoes, p => p.dataProducao, p => p.quantidadeProducao);

        // Agrupar vendas por mês
        const vendasPorMes = groupByMonth(vendas, v => v.dataFinal, v => v.quantidadeVenda);

        // Atualizar o gráfico
        this.updateChart(producaoPorMes, vendasPorMes);
      });
    });
  }

  updateChart(producaoData: number[], vendasData: number[]) {
    if (this.chart) {
      // Atualiza os dados do gráfico existente
      this.chart?.ref?.series[0].setData(producaoData);
      this.chart?.ref?.series[1].setData(vendasData);
    } else {
      // Criar o gráfico se ele ainda não existir
      this.chart = new Chart({
        chart: {
          type: 'line',
          height: 325
        },
        title: {
          text: 'Produção e Vendas por Mês'
        },
        xAxis: {
          categories: [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          ]
        },
        yAxis: {
          title: {
            text: 'Quantidade'
          }
        },
        series: [
          {
            name: 'Produção',
            type: 'line',
            color: '#28a745',
            data: producaoData // Dados de produção
          },
          {
            name: 'Vendas',
            type: 'line',
            color: '#007bff',
            data: vendasData // Dados de vendas
          }
        ],
        credits: {
          enabled: false
        }
      });
    }
  }
}
