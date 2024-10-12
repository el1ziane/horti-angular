import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { faLocation, faShop, faBoxes, faMoneyBill, faIcons } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule,Chart } from 'angular-highcharts';
import { AlertaEstoqueDashboardComponent } from './alerta-estoque-dashboard/alerta-estoque-dashboard.component';
import { FinanceiroMesDashboardComponent } from './financeiro-mes-dashboard/financeiro-mes-dashboard.component';
import { TopVendasDashboardComponent } from './top-vendas-dashboard/top-vendas-dashboard.component';
import { EstoqueService } from '../../services/estoque.service';
import { VendasService } from '../../services/vendas.service';
import { DecimalVirgulaPipe } from '../../shared/decimal-virgula.pipe';
import { FinanceiroService } from '../../services/financeiro.service';


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
    MatCardModule,FontAwesomeModule,ChartModule,AlertaEstoqueDashboardComponent,FinanceiroMesDashboardComponent,TopVendasDashboardComponent,MatIcon, DecimalPipe, DecimalVirgulaPipe
  ]
})


export class DashboardComponent implements OnInit  {
  quantidadeEstoque: number = 0;
  valorTotalVendas: number = 0;
  totalComprasEDespesas: number = 0;
    // You can use the icon definitions here if needed
    faLocation = faLocation;
    faShop = faShop;
    faBoxes = faBoxes;
    faMoneyBill = faMoneyBill;
    faIcons = faIcons;



    constructor( private estoqueService: EstoqueService,
      private vendasService: VendasService, private financeiroService: FinanceiroService) { }

    ngOnInit(): void {
      this.obterQuantidadeEstoque();
      this.obterValorTotalVendas();
      this.obterValorTotalDespesas();
    }

    // Método para obter a quantidade de estoque
    obterQuantidadeEstoque() {
      this.estoqueService.getQuantidadeEstoque().subscribe({
        next: (quantidade) => {
          this.quantidadeEstoque = quantidade; // Armazena a quantidade de estoque
        },
        error: (error) => {
          console.error('Erro ao obter quantidade de estoque', error);
        }
      });
    }
     // Método para obter o valor total de vendas
  obterValorTotalVendas() {
    this.vendasService.getValorTotalVendas().subscribe({
      next: (valorTotal) => {
        this.valorTotalVendas = valorTotal;
      },
      error: (error) => {
        console.error('Erro ao obter valor total de vendas', error);
      }
    });
  }

  private obterValorTotalDespesas(): void {
    // Obter o total de compras pendentes
    this.financeiroService.getTotalComprasPendentes().subscribe(totalCompras => {
       // Obter o total de despesas pendentes
       this.financeiroService.getTotalDespesasPendentes().subscribe(totalDespesas => {
          // Somar compras e despesas pendentes
          this.totalComprasEDespesas = totalCompras + totalDespesas;
          console.log('Total Compras Pendentes:', totalCompras); // Para debug
          console.log('Total Despesas Pendentes:', totalDespesas); // Para debug
          console.log('Total Compras e Despesas:', this.totalComprasEDespesas); // Para debug
       }, error => {
          console.error('Erro ao obter total de despesas pendentes', error);
       });
    }, error => {
       console.error('Erro ao obter total de compras pendentes', error);
    });
 }

}
