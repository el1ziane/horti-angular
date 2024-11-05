import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBoxes, faIcons, faLocation, faMoneyBill, faShop } from '@fortawesome/free-solid-svg-icons';
import { ChartModule } from 'angular-highcharts';
import { EstoqueService } from '../../services/estoque.service';
import { FaturamentoService } from '../../services/faturamento.service';
import { VendasService } from '../../services/vendas.service';
import { DecimalVirgulaPipe } from '../../shared/decimal-virgula.pipe';
import { AlertaEstoqueDashboardComponent } from './alerta-estoque-dashboard/alerta-estoque-dashboard.component';
import { FinanceiroMesDashboardComponent } from './financeiro-mes-dashboard/financeiro-mes-dashboard.component';
import { TopVendasDashboardComponent } from './top-vendas-dashboard/top-vendas-dashboard.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FontAwesomeModule,
    ChartModule,
    AlertaEstoqueDashboardComponent,
    FinanceiroMesDashboardComponent,
    TopVendasDashboardComponent,
    MatIcon,
    DecimalPipe,
    DecimalVirgulaPipe,
  ],
})
export class DashboardComponent implements OnInit {
  quantidadeEstoque: number = 0;
  valorTotalVendas: number = 0;
  totalComprasEDespesas: number = 0;
  faLocation = faLocation;
  faShop = faShop;
  faBoxes = faBoxes;
  faMoneyBill = faMoneyBill;
  faIcons = faIcons;

  constructor(
    private estoqueService: EstoqueService,
    private vendasService: VendasService,
    private faturamentoService: FaturamentoService
  ) {}

  ngOnInit(): void {
    this.obterQuantidadeEstoque();
    this.obterValorTotalVendas();
    this.obterValorTotalDespesas();
  }

  obterQuantidadeEstoque() {
    this.estoqueService.getQuantidadeEstoque().subscribe({
      next: (quantidade) => {
        this.quantidadeEstoque = quantidade;
      },
      error: (error) => {
        console.error('Erro ao obter quantidade de estoque', error);
      },
    });
  }
  obterValorTotalVendas() {
    this.vendasService.getValorTotalVendas().subscribe({
      next: (valorTotal) => {
        this.valorTotalVendas = valorTotal;
      },
      error: (error) => {
        console.error('Erro ao obter valor total de vendas', error);
      },
    });
  }

  private obterValorTotalDespesas(): void {
    this.faturamentoService.getTotalComprasPendentes().subscribe(
      (totalCompras) => {
        this.faturamentoService.getTotalDespesasPendentes().subscribe(
          (totalDespesas) => {
            this.totalComprasEDespesas = totalCompras + totalDespesas;
            console.log('Total Compras Pendentes:', totalCompras);
            console.log('Total Despesas Pendentes:', totalDespesas);
            console.log(
              'Total Compras e Despesas:',
              this.totalComprasEDespesas
            );
          },
          (error) => {
            console.error('Erro ao obter total de despesas pendentes', error);
          }
        );
      },
      (error) => {
        console.error('Erro ao obter total de compras pendentes', error);
      }
    );
  }
}
