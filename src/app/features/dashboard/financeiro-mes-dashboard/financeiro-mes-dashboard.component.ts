import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartModule, Chart } from 'angular-highcharts';
import { ProducaoService } from '../../../services/producao.service';
import { VendasService } from '../../../services/vendas.service';
import { Subscription, interval } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-financeiro-mes-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './financeiro-mes-dashboard.component.html',
  styleUrl: './financeiro-mes-dashboard.component.scss',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class FinanceiroMesDashboardComponent implements OnInit, OnDestroy {
  chart!: Chart;
  updateInterval = 5000;
  private subscription!: Subscription;

  constructor(
    private producaoService: ProducaoService,
    private vendasService: VendasService
  ) {}

  ngOnInit(): void {
    this.loadDataForChart();
    this.subscription = interval(this.updateInterval).subscribe(() => {
      this.loadDataForChart();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadDataForChart() {
    this.producaoService.list().subscribe((producoes) => {
      this.vendasService.list().subscribe((vendas) => {
        const categories = [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez',
        ];

        const groupByMonth = (
          items: any[],
          getDateFunc: (item: any) => string,
          getQuantityFunc: (item: any) => number | null
        ) => {
          const grouped = new Array(12).fill(0);
          items.forEach((item) => {
            const rawDate = getDateFunc(item);
            const [day, month, year] = rawDate.split('-');
            const formattedDate = `${year}-${month}-${day}`;
            const date = new Date(formattedDate);
            const monthIndex = date.getMonth();
            grouped[monthIndex] += getQuantityFunc(item) || 0;
          });
          return grouped;
        };

        const producaoPorMes = groupByMonth(
          producoes,
          (p) => p.dataProducao,
          (p) => p.quantidadeProducao
        );

        const vendasPorMes = groupByMonth(
          vendas,
          (v) => v.dataFinal,
          (v) => v.quantidadeVenda
        );

        this.updateChart(producaoPorMes, vendasPorMes);
      });
    });
  }

  updateChart(producaoData: number[], vendasData: number[]) {
    if (this.chart) {
      this.chart?.ref?.series[0].setData(producaoData);
      this.chart?.ref?.series[1].setData(vendasData);
    } else {
      this.chart = new Chart({
        chart: {
          type: 'line',
          height: 325,
        },
        title: {
          text: 'Produção e Vendas por Mês',
        },
        xAxis: {
          categories: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
        },
        yAxis: {
          title: {
            text: 'Quantidade',
          },
        },
        series: [
          {
            name: 'Produção',
            type: 'line',
            color: '#28a745',
            data: producaoData,
          },
          {
            name: 'Vendas',
            type: 'line',
            color: '#007bff',
            data: vendasData,
          },
        ],
        credits: {
          enabled: false,
        },
      });
    }
  }
}
