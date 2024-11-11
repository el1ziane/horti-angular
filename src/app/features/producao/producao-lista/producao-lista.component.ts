import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import {DetalhesProducaoDialogComponent} from '../detalhes-producao-dialog/detalhes-producao-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { Producao } from '../../../model/producao';
import { ProducaoService } from '../../../services/producao.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';



@Component({
    selector: 'app-producao-lista',
    templateUrl: './producao-lista.component.html',
    styleUrl: './producao-lista.component.scss',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow,  CommonModule, MatMenu, MatMenuItem, MatDivider, MatMenuTrigger,MatPaginator,MatSortModule, MatPaginatorModule]
})
export class ProducaoListaComponent implements OnInit, AfterViewInit {


  //@Input() producoes: Producao[] = [];
  @Input() dataSource!: MatTableDataSource<Producao>;
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns = ['codigoProducao', 'produtoProducao', 'quantidadeProducao', 'dataProducao','acoes'];

  constructor(public dialog: MatDialog, private producaoService: ProducaoService){}
  ngOnInit(): void {}
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }
  toggleDetails(producao: Producao) {
    producao.showDetails = !producao.showDetails;
  }

  enviarParaRelatorio() {
    this.producaoService.setProducaoParaRelatorio(this.dataSource.data);
  }
  onAdd() {
    this.add.emit(true);

  }
  onEdit(producao: Producao){
    this.edit.emit(producao);
  }
  onDelete(producao:Producao){
    this.delete.emit(producao);
  }

  openDetailsDialog(producao: any): void {
    this.dialog.open(DetalhesProducaoDialogComponent, {
      width: '300px',
      data: producao
    });
  }
}
